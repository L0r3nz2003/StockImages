const e = require("express");
const express = require("express");
const router  = express.Router();
const imageManager = require("../controllers/image_manager");
const fs = require('file-system');
const fileUpload = require("express-fileupload");

router.use(fileUpload());

//upload
router.post("/upload", async (req, res) => {
    const file = req.files;
    console.log("-- Testen ---")
    console.log(file);
    res.send("upload")

});

router.post("/download", async (req, res) => {
    

    res.send("download");

});


module.exports = router;