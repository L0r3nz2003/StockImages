const { response } = require('express');
const fs = require('fs');
const { resolve } = require('path');
const { finished } = require('stream');
const { all } = require('../routes/image');
const Dropbox = require("dropbox").Dropbox
const imgService = require("../services/img_service");
const userService = require("../services/user_service.js");


const dbx = new Dropbox({
  accessToken:
    'Lu3ZPqppFmkAAAAAAAAAAWQDruKwvjzUamxFx1tycMP6gNSQ2ehhhh__ml8UKMcU'
});



class ImageManagement {

  // upload image to dropbox and insert given things to dtabase
  uploadImage = async (image, beschreibung, userId, tags) => {
    let success = "";

    const oldFilename = image.name;
    const uploadTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await imgService.createImg(oldFilename, uploadTime, beschreibung, userId, tags);

    const id = await imgService.getImgId(oldFilename, userId, uploadTime);

    const newEnding = await this.getFileEnding(id[0].id);

    image.name = id[0].id + '.' + newEnding;

    await dbx.filesUpload({
      path: `/dropbox/${image.name}`,
      contents: image.data
    })
      .then(function () {
        success = true;
      })
      .catch(function () {
        success = false;
      });
    return success;
  }

  // Dowload image from dropbox
  downloadImage = async (id) => {
    let binary = "";

    const sharedLink = await this.getShardLink(id);

    await dbx.sharingGetSharedLinkFile({ url: String(sharedLink) })
      .then(function (data) {
        binary = data.result.fileBinary;
      })
      .catch(function (error) {
        console.error(error);
      });
    return binary;

  }

  // Delete image form dropbox and 
  deleteImage = async (id) => {
    let success = "";

    const fileEnding = await this.getFileEnding(id);
    dbx.filesDelete({ path: `/dropbox/${id + "." + fileEnding}` })
      .then(function (data) {
        imgService.deleteImgById(id);
        success = true;
      })
      .catch(function (error) {
        success = false;
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


}


module.exports = new ImageManagement();