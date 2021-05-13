const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const phash = require("sharp-phash");
const dist = require("sharp-phash/distance");

const imageManager = require("../controllers/image_manager");
const jwtmanager = require("../controllers/jwt_manager");

router.use(fileUpload());




/**upload
 * req.files.file
 * req.query.beschreibung
 * req.query.uid
 * req.query.tags
 */
router.post("/upload", /*jwtmanager.verifyToken,*/  imageManager.uploadImage);



/**download
 * req.query.id
 */
router.get("/download"/*, jwtmanager.verifyToken*/, imageManager.downloadImage);














// delete
router.delete("/delete", /*jwtmanager.verifyToken,*/ async (req, res) => {
  // 0 - Check if id is provided
  const id = req.query.id;
  if (id == null) {
    res.status(500).send({ error: "no id provided" });
    return;
  }
  // 1 - Delete image
  const succsess = await imageManager.deleteImage(id);
  if (succsess) {
    res.status(500).send("delete error");
    return;
  }
  res.sendStatus(200);
});

//getUrls
router.get("/urls", async (req, res) => {
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
    erg: erg,
  });
});

/**
 * Default - color_change = 5
 * Default - mirrow = 31
 * Default - Resulation_normal = 1
 * Default - resulation_extrem = 0
 * Default - text = 4
 * Default - verzerrt = 2
 */

module.exports = router;
