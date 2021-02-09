const e = require("express");
const express = require("express");
const router  = express.Router();
const imageManager = require("../controllers/image_manager");
const fs = require('file-system');
const fileUpload = require("express-fileupload");

router.use(fileUpload());

//upload
router.post("/upload", async (req, res) => {
    if(req.files){
        const file = req.files.file;
        imageManager.uploadImage(file, "Das ist ein Test", 31);
    }
    res.send("Upload");

});

// download
router.get("/download", async (req, res) => {
    console.log(req.query.id);
    const file = await imageManager.downloadImage(16);
    
    res.set('Content-Type', 'image/jpg');
    //res.contentType('image/jpg');
    res.send(file);
    console.log("Downloaded");
    
    res.send("Hallo");
    
});

// delete
router.post("/delete", async (req, res) => {
    
    imageManager.deleteImage();
    res.send("deleted");

});


module.exports = router;