const e = require("express");
const express = require("express");
const router  = express.Router();
const imageManager = require("../controllers/image_manager");
const fs = require('file-system');
const fileUpload = require("express-fileupload");

router.use(fileUpload());

//upload
router.post("/upload", async (req, res) => {
  console.log(req);
    if(req.files){
        console.log("Filename: " + req.files.file.name);
    }

});

router.post("/download", async (req, res) => {


    res.send("download");

});


module.exports = router;
