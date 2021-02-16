const e = require("express");
const express = require("express");
const router  = express.Router();
const imageManager = require("../controllers/image_manager");
const fs = require('fs');
const fileUpload = require("express-fileupload");
const https = require('https');
const Stream = require('stream').Transform;
const request = require('request');

router.use(fileUpload());

//upload
router.post("/upload", async (req, res) => {
    if(!req.files){
        res.status(500).send({ error: "no image provided" });
        return;
    }
    const file = req.files.file;
    const beschreibung = req.query.beschreibung;
    const uid = req.query.uid;
    const succsess = await imageManager.uploadImage(file, beschreibung, uid);
    if(succsess){
      res.status(200).send("OK");
    }else{
      res.status(500).send("upload error");
    }  
});

// download
router.get("/download", async (req, res) => {
    const id = req.query.id;
    const data = await imageManager.downloadImage(id);
    res.setHeader('content-type', 'image/jpeg');
    res.write(data, 'binary');
    res.end();
});

// delete
router.delete("/delete", async (req, res) => {
    const id = req.query.id;
    imageManager.deleteImage(id);
    res.send("deleted");
});


module.exports = router;
