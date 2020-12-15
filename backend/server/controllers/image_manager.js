var fs = require('file-system');
const dropboxV2Api = require('dropbox-v2-api');

const dropbox = dropboxV2Api.authenticate({
    token: 'Lu3ZPqppFmkAAAAAAAAAAWQDruKwvjzUamxFx1tycMP6gNSQ2ehhhh__ml8UKMcU'
});


class ImageManagement{

    uploadImage = async (localpathName, cloudpath) => {
        dropbox({
            resource: 'files/upload',
            parameters: {
                path: cloudpath
            },
            readStream: fs.createReadStream(localpathName)
        }, (err, result, response) => {
            //upload completed
        });
    }

    downloadImage = async (localpathName, cloudpath) => {
        dropbox({
            resource: 'files/download',
            parameters: {
                path: cloudpath
            }
        }, (err, result, response) => {
            //download completed
        })
        .pipe(fs.createWriteStream(localpathName));
    }




}


module.exports = new ImageManagement();