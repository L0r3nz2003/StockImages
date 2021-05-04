const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const phash = require('sharp-phash');
const dist = require('sharp-phash/distance');

const imageManager = require("../controllers/image_manager");
const jwtmanager = require("../controllers/jwt_manager");

router.use(fileUpload());

//upload
router.post("/upload", jwtmanager.verifyToken, async (req, res) => {
    // 0 - Check if files are provided
    if (!req.files) {
        res.status(500).send({ error: "no image provided" });
        return;
    }
    // 1 - generate pHash and look for dublicates
    const file = req.files.file;
    const hashValue = await phash(file.data);
    const rowsInDatabase = await imageManager.getImageByPhash(hashValue);
    if (rowsInDatabase.length != 0) {
        res.status(500).send({ error: "Duplicates are not allowed" });
        return;
    }
    // 2 - Check if all data is provided
    const beschreibung = req.query.beschreibung;
    const uid = req.query.uid;
    const tags = req.query.tags.toUpperCase();
    if (beschreibung == null || uid == null || tags == null) {
        res.status(500).send({ error: "no text or userId or tags provided" });
        return;
    }
    // 3 - upload image
    const succsess = await imageManager.uploadImage(file, beschreibung, uid, tags, hashValue);
    if (!succsess) res.status(500).send("upload error");
    res.status(200).send("OK");
});

// download
router.get("/download", jwtmanager.verifyToken, async (req, res) => {
    // 0 - Check if id is provided
    const id = req.query.id;
    if (id == null) {
        res.status(500).send({ error: "no id provided" });
        return;
    }
    // 1 - Check if image is storred
    const data = await imageManager.downloadImage(id);
    if (data == "") {
        res.status(500).send("download error");
        return;
    }
    // 2 - download / send image to user
    const ending = await imageManager.getFileEnding(id);
    switch (ending) {
        case "jpg":
            res.setHeader('content-type', 'image/jpeg');
            break;
        case "png":
            res.setHeader('content-type', 'image/png');
            break;
    }
    res.write(data, 'binary').end();
});

// delete
router.delete("/delete", jwtmanager.verifyToken, async (req, res) => {
    // 0 - Check if id is provided
    const id = req.query.id;
    if (id == null) {
        res.status(500).send({ error: "no id provided" });
        return;
    }
    // 1 - Delete image
    const succsess = await imageManager.deleteImage(id);
    if (!succsess) {
        res.status(500).send("delete error");
        return;
    }
    res.status(200);
});

//getUrls
router.get("/urls", jwtmanager.verifyToken, async (req, res) => {
    // 0 - Check if all data is provided
    const userName = req.query.userName;
    const all = req.query.all;
    const tag = req.query.tag.toUpperCase();
    if (userName == null && all == null && tag == null) {
        res.status(500).send({ error: "no parameter provided" });
        return;
    }
    // 1 - return all images from a user
    if (userName != null) {
        const imgLinks = await imageManager.getImageUrlByName(userName);
        res.status(200).send(imgLinks);
        return;
    }
    // 2 - return all images
    if (all) {
        const imgLinks = await imageManager.getAllImages();
        res.status(200).send(imgLinks);
        return;
    }
    // 3 - return all images from tag
    if (tag != null) {
        const imgLinks = await imageManager.getImageByTag(tag);
        res.status(200).send(imgLinks);
        return;
    }
});

// pHash test
router.post("/phash", async (req, res) => {
    // 0 - check for files
    if (!req.files) {
        res.status(500).send({ error: "no image provided" });
        return;
    }
    // 1 - get files
    const file1 = req.files.file1;
    const file2 = req.files.file2;
    // 2 - create pHashes
    const phashFile1 = await phash(file1.data);
    const phashFile2 = await phash(file2.data);
    // 3 - create hamindDistance
    const erg = dist(phashFile1, phashFile2);
    // 4 - send information
    res.json({
        message: "es geht",
        file1: file1.name,
        phashFile1: phashFile1,
        file2: file2.name,
        phashFile2: phashFile2,
        erg: erg
    });
});

/*
    Default - color_change = 5
    Default - mirrow = 31
    Default - Resulation_normal = 1
    Default - resulation_extrem = 0
    Default - text = 4
    Default - verzerrt = 2
*/


module.exports = router;