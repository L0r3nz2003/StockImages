const e = require("express");
const express = require("express");
const router  = express.Router();
const imageManager = require("../controllers/image_manager");

const fileUpload = require("express-fileupload");

router.use(fileUpload());

//upload
router.post("/upload", async (req, res) => {

    console.log(req.files.foo);
    res.send("upload")

});

router.post("/download", async (req, res) => {
    

    res.send("download");

});


module.exports = router;