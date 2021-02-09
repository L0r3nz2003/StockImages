const { response } = require('express');
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

    downloadImage = async () => {
        const id = 16;
        var file = "";

        await dbx.filesDownload({path: `/dropbox/${id+ ".jpg"}`})
                .then(function(response) {
            file = response.result;
        })
        .catch(function(error) {
            console.error(error);
        });
        return file;
    }

    deleteImage = async () => {
        const id = 15;
        dbx.filesDelete({path: `/dropbox/${id+ ".jpg"}`})
        .catch(function(error) {
            console.error(error);
        });

        console.log("deleted");

    }


}


module.exports = new ImageManagement();