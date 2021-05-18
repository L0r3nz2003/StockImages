const express = require("express");
const router = express.Router();

const jwtmanager = require("../controllers/jwt_manager");
const mail_manager = require("../controllers/mail_manager");

/**Route for password reset enquiry
 * req.query.email
 */
router.post("/forgot-password", mail_manager.forgotPassword);

/**reset password
 * req.body.password / req.body.password2 / req.query.id
 */
router.post("/reset-password", jwtmanager.verifyTokenMail, mail_manager.resetPassword);

module.exports = router;




