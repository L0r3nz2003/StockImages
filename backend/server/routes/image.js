const e = require("express");
const express = require("express-fileupload");
const router  = express.Router();
const imageManager = require("../controllers/image_manager");



//upload
router.post("/upload", async (req, res) => {

    console.log(req.files.foo);
    res.send("upload")

});

router.post("/download", async (req, res) => {
    

    res.send("download");

});


module.exports = router;