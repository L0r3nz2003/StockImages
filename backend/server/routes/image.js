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

router.post("/download", async (req, res) => {
    

    res.send("download");

});


module.exports = router;