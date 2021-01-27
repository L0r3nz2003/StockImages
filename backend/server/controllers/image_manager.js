const fs = require('file-system');
const Dropbox = require("dropbox").Dropbox
const imgService = require("../services/img_service");



const dbx = new Dropbox({
    accessToken:
        'Lu3ZPqppFmkAAAAAAAAAAWQDruKwvjzUamxFx1tycMP6gNSQ2ehhhh__ml8UKMcU'
  });



class ImageManagement{
    

    uploadImage = async (image, beschreibung, userId) => {
        const oldFilename = image.name;
        const uploadTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(uploadTime);
        //uploadTime = uploadTime.this.toYMD();
        

        await imgService.createImg(oldFilename, uploadTime, beschreibung, userId);

        const newImgName = await imgService.getImgId(oldFilename, userId, uploadTime);
        image.name = newImgName[0].id+'.jpg';

        console.log("upload start....");
        dbx.filesUpload({
            path: `/dropbox/${image.name}`,
            contents: image.data
        })
        .then(response => {
            //console.log(response);
          })
          .catch(err => {
            //console.log(err);
          });
        console.log("upload ende");
        
    }

    downloadImage = async (localpathName, cloudpath) => {
        console.log("download start....");
        // TODO 
        console.log("download ende");
    }




}


module.exports = new ImageManagement();