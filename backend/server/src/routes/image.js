const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const imageManager = require("../controllers/image_manager");
const jwtmanager = require("../controllers/jwt_manager");

router.use(fileUpload());


/**upload
 * req.files.file
 * req.query.beschreibung
 * req.query.uid
 * req.query.tags
 */
router.post("/upload", jwtmanager.verifyToken, imageManager.uploadImage);

/**download
 * req.query.id
 */
router.get("/download", jwtmanager.verifyToken, imageManager.downloadImage);

/**delete
 * req.query.id
 */
router.delete("/delete", jwtmanager.verifyToken, imageManager.deleteImage);

/**getUrls
 * req.query.userName
 * req.query.all
 * req.query.tag
 * 
 * all equals null => error
 * username given => images from user
 * all equals true => all images
 * tag given => images with this tag
 */
router.get("/urls", imageManager.getUrls);


router.post("/phash", imageManager.phashCompare);


/**
 * Default - color_change = 5
 * Default - mirrow = 31
 * Default - Resulation_normal = 1
 * Default - resulation_extrem = 0
 * Default - text = 4
 * Default - verzerrt = 2
 */

module.exports = router;
