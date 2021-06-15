const Dropbox = require("dropbox").Dropbox
const phash = require("sharp-phash");
const dist = require("sharp-phash/distance");

const imgService = require("../services/img_service");
const userService = require("../services/user_service.js");
const Image = require("../classes/image.js");


const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESSTOKEN
});



class ImageManagement {

  // upload image to dropbox and insert given things to database
  // INTERFACE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  uploadImage = async (req, res, next) => {
    try {
      // 0 - Check if files are provided
      if (!req.files) {
        res.status(500).send({ error: "no image provided" });
        return;
      }
      // 1 - generate pHash and look for dublicates
      const file = req.files.file;
      const hashValue = await phash(file.data);
      const rowsInDatabase = await imgService.getImgByPhash(hashValue);
      if (rowsInDatabase.length != 0) {
        res.status(500).send({ error: "Duplicates are not allowed" });
        return;
      }
      // 2 - Check if all data is provided
      const beschreibung = req.query.beschreibung;
      const uid = req.query.uid;
      const tags = req.query.tags.toUpperCase();
      console.log("TESTTTT");
      if (beschreibung == null || uid == null || tags == null) {
        res.status(500).send({ error: "no text or userId or tags provided" });
        return;
      }
      // 3 - get necessary data
      const oldFilename = file.name;
      // 3.1 - get upload-time and change it to mysql syntax
      const uploadTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
      // 4 - create image object in database
      console.log("BEFORE");
      const image = new Image(oldFilename, uploadTime, beschreibung, uid, tags, hashValue);
      await imgService.createImg(image);
      // 5 - build new filename
      const id = await imgService.getImgId(oldFilename, uid, uploadTime);
      const newEnding = await this.getFileEnding(id[0].id);
      file.name = id[0].id + '.' + newEnding;
      // 6 - upload image to dropbox
      const success = await dbx.filesUpload({
        path: `/dropbox/${file.name}`,
        contents: file.data
      });
      // 7 - send response
      if (!success) res.status(500).send("upload error");
      res.status(200).send("OK");
    } catch (error) {
      next(error);
    }
  }


  downloadImage = async (req, res, next) => {
    try {
      // 0 - Check if id is provided
      const id = req.query.id;
      if (id == null) {
        res.status(500).send({ error: "no id provided" });
        return;
      }
      // 1 - Check if id is storred / get data
      const sharedLink = await this.getShardLink(id);
      const response = await dbx.sharingGetSharedLinkFile({ url: String(sharedLink) });
      const data = response.result.fileBinary;
      if (data == "") {
        res.status(500).send("download error");
        return;
      }
      // 2 - download / send image to user
      const ending = await this.getFileEnding(id);
      switch (ending) {
        case "jpg":
          res.setHeader("content-type", "image/jpeg");
          break;
        case "png":
          res.setHeader("content-type", "image/png");
          break;
        default:
          res.status(500).send("Datatype not supported");
      }
      res.write(data, "binary");
      res.end(null, 'binary');
    } catch (error) {
      next(error);
    }
  };

  deleteImage = async (req, res, next) => {
    try {
      // 0 - Check if id is provided
      const id = req.query.id;
      if (id == null) {
        res.status(500).send({ error: "no id provided" });
        return;
      }
      // 1 - Delete image from dropbox
      const fileEnding = await this.getFileEnding(id);
      const succsess = await dbx.filesDelete({ path: `/dropbox/${id + "." + fileEnding}` });
      // 2 - return error case
      if (!succsess) {
        res.status(500).send("delete error");
        return;
      }
      // 3 - delete image object form database
      imgService.deleteImgById(id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };



  getUrls = async (req, res, next) => {
    try {
      // 0 - Check if all data is provided
      const userName = req.query.userName;
      const all = req.query.all;
      const tag = req.query.tag.toUpperCase();
      if (userName === 'null' && all === 'null' && tag.toLowerCase() === 'null') {
        res.status(500).send({ error: "no parameter provided" });
        return;
      }
      // 1 - return all images from a user
      if (userName !== 'null') {
        const imgLinks = await this.getImageUrlByName(userName);
        res.status(200).send(imgLinks);
        return;
      }
      // 2 - return all images
      if (all == 'true') {
        const imgLinks = await this.getAllImages();
        res.status(200).send(imgLinks);
        return;
      }
      // 3 - return all images from tag
      if (tag.toLowerCase() !== 'null') {
        const imgLinks = await this.getImageByTag(tag);
        res.status(200).send(imgLinks);
        return;
      }
    } catch (error) {
      next(error);
    }
  };

  phashCompare = async (req, res, next) => {
    try {
      if (!req.files) {
        res.status(500).send({ error: "no image provided" });
        return;
      }

      const file1 = req.files.file1;
      const file2 = req.files.file2;

      const phashFile1 = await phash(file1.data);
      const phashFile2 = await phash(file2.data);

      res.json({
        default: phashFile1,
        mirrow_: phashFile2
      });



    } catch (error) {
      next(error);
    }




  };









  // get all imagesurls from a user by his name
  getImageUrlByName = async (userName) => {
    const user = await userService.getUserByName(userName);
    const imageIdsByUserId = await imgService.getUserImg(user[0].UserId);
    return await this.getLinksToImage(imageIdsByUserId);
  };

  // gat all immages
  getAllImages = async () => {
    const allImages = await imgService.getAllImg();
    return await this.getLinksToImage(allImages);
  }

  // get all Images by a given Tag
  getImageByTag = async (tag) => {
    const images = await imgService.getImgByTag(tag);
    return await this.getLinksToImage(images);
  }

  // Get links to image from sharedlink
  getLinksToImage = async (elements) => {
    let linkArr = [];
    // 0 - create array with all shared links
    await Promise.all(elements.map(async (elem) => {
      const sharedlink = await this.getShardLink(elem.id);
      const link = sharedlink.replace('dl=0', 'raw=1');
      linkArr.push(link);
    }));
    return linkArr;
  }

  // get sharedlink from image with its id
  getShardLink = async (id) => {
    const fileEnding = await this.getFileEnding(id);
    const response = await dbx.sharingCreateSharedLink({ path: `/dropbox/${id + "." + fileEnding}` });
    return response.result.url;
  }

  // get ending of the file (jpg | png | ...)
  getFileEnding = async (id) => {
    const filename = await imgService.getImgName(id);
    return filename[0].FileName.split(".")[filename[0].FileName.split(".").length - 1];
  }


}


module.exports = new ImageManagement();