const e = require("express");
const express = require("express");
const router = express.Router();
const imageManager = require("../controllers/image_manager");
const fs = require('fs');
const fileUpload = require("express-fileupload");
const https = require('https');
const Stream = require('stream').Transform;
const request = require('request');

const jwtmanager = require("../controllers/jwt_manager");

//---------------------PHASH----------------------------
const phash = require('sharp-phash');
const dist = require('sharp-phash/distance');
//------------------------------------------------------

router.use(fileUpload());

//upload
router.post("/upload", jwtmanager.verifyToken, async (req, res) => {
    if (!req.files) {
        res.status(500).send({ error: "no image provided" });
        return;
    }
    const file = req.files.file;
    const hashValue = await phash(file.data);
    const rowsInDatabase = await imageManager.getImageByPhash(hashValue);
    if (rowsInDatabase.length != 0) {
        res.status(500).send({ error: "Duplicates are not allowed" });
        return;
    }


    const beschreibung = req.query.beschreibung;
    const uid = req.query.uid;
    const tags = req.query.tags.toUpperCase();
    if (beschreibung == null || uid == null || tags == null) {
        res.status(500).send({ error: "no text or userId or tags provided" });
        return;
    }
    console.log(tags);
    const succsess = await imageManager.uploadImage(file, beschreibung, uid, tags, hashValue);
    if (succsess) {
        res.status(200).send("OK");
    } else {
        res.status(500).send("upload error");
    }
});

// download
router.get("/download", jwtmanager.verifyToken, async (req, res) => {
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
router.delete("/delete", jwtmanager.verifyToken, async (req, res) => {
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
router.get("/urls", jwtmanager.verifyToken, async (req, res) => {
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




// =========================================================================
//                  PHASH ÜBUNGEN
// =========================================================================

router.post("/phash", async (req, res) => {

    if (!req.files) {
        res.status(500).send({ error: "no image provided" });
        return;
    }
    /*
        const file1 = req.files.file1;
        const file2 = req.files.file2;
    
        const phashFile1 = await phash(file1.data);
        const phashFile2 = await phash(file2.data);
        console.log("test: " + (phashFile1 == phashFile2));
        const erg = dist(phashFile1, phashFile2);
    
        console.log(erg);
    
        res.json({
            message: "es geht",
            file1: file1.name,
            phashFile1: phashFile1,
            file2: file2.name,
            phashFile2: phashFile2,
            erg: erg
        });
    */

    const hash = await phash(req.files.file.data);
    const result = await imageManager.getImageByPhash(hash);

    const double = result.length != 0;

    res.json({
        duplikat: double
    });


});







module.exports = router;
