const e = require("express");
const express = require("express");
const router = express.Router();
const imageManager = require("../controllers/image_manager");
const fs = require('fs');
const fileUpload = require("express-fileupload");
const https = require('https');
const Stream = require('stream').Transform;
const request = require('request');

router.use(fileUpload());

//upload
router.post("/upload", async (req, res) => {
    if (!req.files) {
        res.status(500).send({ error: "no image provided" });
        return;
    }
    const file = req.files.file;
    const beschreibung = req.query.beschreibung;
    const uid = req.query.uid;
    const tags = req.query.tags.toUpperCase();
    if (beschreibung == null || uid == null || tags == null) {
        res.status(500).send({ error: "no text or userId or tags provided" });
        return;
    }
    const succsess = await imageManager.uploadImage(file, beschreibung, uid, tags);
    if (succsess) {
        res.status(200).send("OK");
    } else {
        res.status(500).send("upload error");
    }
});

// download
router.get("/download", async (req, res) => {
    const id = req.query.id;
    if (id == null) {
        res.status(500).send({ error: "no id provided" });
        return;
    }
    const data = await imageManager.downloadImage(id);
    if (data == "") {
        res.status(500).send("download error");
        return;
    } else {
        const ending = await imageManager.getFileEnding(id);
        switch (ending) {
            case "jpg":
                res.setHeader('content-type', 'image/jpeg');
                break;
            case "png":
                res.setHeader('content-type', 'image/png');
                break;
        }
        res.write(data, 'binary');
        res.end();
    }

});

// delete
router.delete("/delete", async (req, res) => {
    const id = req.query.id;
    if (id == null) {
        res.status(500).send({ error: "no id provided" });
        return;
    }
    const succsess = await imageManager.deleteImage(id);
    if (succsess) {
        res.status(500).send("delete error");
        return;
    }
    res.status(200);
});

//getUrls
router.get("/urls", async (req, res) => {
    const userName = req.query.userName;
    const all = req.query.all;
    const tag = req.query.tag.toUpperCase();

    if (userName == null && all == null && tag == null) {
        res.status(500).send({ error: "no parameter provided" });
        return;
    }


    let imgLinks = "";
    if (userName != null) {
        imgLinks = await imageManager.getImageUrlByName(userName);

    } else if (all) {
        imgLinks = await imageManager.getAllImages();
    } else if (tag != null) {
        imgLinks = await imageManager.getImageByTag(tag);
    }
    imgLinks = JSON.stringify(imgLinks);

    res.status(200).send(imgLinks);

});


module.exports = router;
