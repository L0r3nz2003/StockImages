const express = require("express");
const router = express.Router();
const userManager = require("../controllers/user_manager");

const jwtmanager = require("../controllers/jwt_manager");

/**Return User with this ID | IF ID is null => return all user
 * if Error: http status 404 Not found
 * rep.query.id
 */
router.get("/show", userManager.showUsers);

/**Return User with this name and email
 * if not unique: 409 (Conflict)
 * rep.query.iname / rep.query.email
 */
router.get("/checkunique", userManager.checkUserUniqe);

/**Return User with this email if the password id correct
 * if Error: http status 404 Not found
 * rep.query.email / req.query.password
 */
router.get("/exists", userManager.checkIfUserExists);

/**Create new User, id is Autoincrement
 * Needs a complete User object
 * If User already exists
 * => Error 404 User already exists
 * req.body
 */
router.post("/create" /*, jwtmanager.verifyToken*/,);

/**Change the User with this ID
 * Needs a complete User object
 * if Error: http status 404 Not found
 * req.query.id / req.body
 */
router.put("/update", jwtmanager.verifyToken, userManager.changeUser);

/**Change Username of this user
 * if Error http status 404 Not found
 * req.query.oldname / req.query.newname
 */
router.put("/updatename", jwtmanager.verifyToken, userManager.changeUserName);

/**Delete that User with this ID
 * If User not found
 * => Error: http status 404 Not found
 * req.query.id
 */
router.delete("/deletebyid", jwtmanager.verifyToken, userManager.deleteUser);

module.exports = router;
