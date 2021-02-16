const { response } = require('express');
const fs = require('fs');
const Dropbox = require("dropbox").Dropbox
const imgService = require("../services/img_service");



const dbx = new Dropbox({
    accessToken:
        'Lu3ZPqppFmkAAAAAAAAAAWQDruKwvjzUamxFx1tycMP6gNSQ2ehhhh__ml8UKMcU'
  });



class ImageManagement{
    

    uploadImage = async (image, beschreibung, userId) => {
        let success = "";

        const oldFilename = image.name;
        const uploadTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        

        await imgService.createImg(oldFilename, uploadTime, beschreibung, userId);

        const newImgName = await imgService.getImgId(oldFilename, userId, uploadTime);
        image.name = newImgName[0].id+'.jpg';

        await dbx.filesUpload({
            path: `/dropbox/${image.name}`,
            contents: image.data
        })
        .then(function(){
            success = true;
          })
          .catch(function(){
            success = false;
          });
        return success;
    }

    downloadImage = async (id) => {
      let binary = "";
      let sharedLink = "";

      await dbx.sharingCreateSharedLink({ path : `/dropbox/${id+ ".jpg"}` }).then(function(response){
        
        sharedLink = response.result.url;
      });

      await dbx.sharingGetSharedLinkFile({url: String(sharedLink)})
          .then(function(data){
            binary = data.result.fileBinary;
          })  
          .catch(function (error) {
            console.error(error);
        });
      return binary;
      
      // ......raw=1
    }

    deleteImage = async (id) => {
        try{
          dbx.filesDelete({path: `/dropbox/${id+ ".jpg"}`})
          .catch(function(error) {
            console.error(error);
          });

          imgService.deleteImgById(id);
          console.log("deleted");
        }catch{
          console.log("ERROR")
        }
    }


}


module.exports = new ImageManagement();