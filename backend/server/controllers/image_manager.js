const { response } = require('express');
const fs = require('fs');
const { resolve } = require('path');
const { finished } = require('stream');
const { all } = require('../routes/image');
const Dropbox = require("dropbox").Dropbox
const phash = require("sharp-phash");
const dist = require("sharp-phash/distance");

const imgService = require("../services/img_service");
const userService = require("../services/user_service.js");


const dbx = new Dropbox({
  accessToken: 'Lu3ZPqppFmkAAAAAAAAAAWQDruKwvjzUamxFx1tycMP6gNSQ2ehhhh__ml8UKMcU'
});



class ImageManagement {

  // upload image to dropbox and insert given things to database
  // INTERFACE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  uploadImage = async (req, res) => {
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
    if (beschreibung == null || uid == null || tags == null) {
      res.status(500).send({ error: "no text or userId or tags provided" });
      return;
    }
    // 3 - get necessary data
    const oldFilename = file.name;
    // 3.1 - get upload-time and change it to mysql syntax
    const uploadTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // 4 - create image object in database
    await imgService.createImg(oldFilename, uploadTime, beschreibung, uid, tags, hashValue);
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
  }


  downloadImage = async (req, res) => {
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
  };








  /*
    // Dowload image from dropbox
    downloadImage = async (id) => {
      let binary = "";
  
      const sharedLink = await this.getShardLink(id);
  
      await dbx.sharingGetSharedLinkFile({ url: String(sharedLink) })
        .then((data) => {
          binary = data.result.fileBinary;
        })
        .catch(function (error) {
          console.error(error);
        });
      return binary;
  
    }
    */

  // Delete image form dropbox and 
  deleteImage = async (id) => {
    let success = "";

    const fileEnding = await this.getFileEnding(id);
    dbx.filesDelete({ path: `/dropbox/${id + "." + fileEnding}` })
      .then(function (data) {
        imgService.deleteImgById(id);
        success = false;
      })
      .catch(function (error) {
        success = true;
      });

    return success
  }

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

    await Promise.all(elements.map(async (elem) => {
      const sharedlink = await this.getShardLink(elem.id);
      const link = sharedlink.replace('dl=0', 'raw=1');

      linkArr.push(link);
    }));

    return linkArr;
  }

  // get sharedlink from image with its id
  getShardLink = async (id) => {
    let sharedLink = "";
    const fileEnding = await this.getFileEnding(id);
    await dbx.sharingCreateSharedLink({ path: `/dropbox/${id + "." + fileEnding}` }).then(function (response) {
      sharedLink = response.result.url;
    });
    return sharedLink;
  }

  // get ending of the file (jpg | png | ...)
  getFileEnding = async (id) => {
    const filename = await imgService.getImgName(id);
    return filename[0].FileName.split(".")[filename[0].FileName.split(".").length - 1];
  }

  // get images in range of phash hamming distance
  getImageByPhash = async (phash) => {
    return await imgService.getImgByPhash(phash);
  }

}


module.exports = new ImageManagement();