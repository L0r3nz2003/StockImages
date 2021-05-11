const e = require("express");
const express = require("express");
const router = express.Router();
const userManager = require("../controllers/user_manager");

const jwtmanager = require("../controllers/jwt_manager");

const passwordHash = require("bcrypt");
const saltRounds = 10;

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

// Change the User with this ID
// Needs a complete User object
// if Error: http status 404 Not found
router.put("/update", jwtmanager.verifyToken, async (req, res) => {
  const user = await userManager.getSingleUser(req.query.id);
  if (Object.keys(user).length == 0) {
    res.status(404).send("Not found");
    return;
  }
  const result = await userManager.updateUser(req.query.id);
  res.send(result);
});

// Change Username of this user
// if Error http status 404 Not found
router.put("/updatename", jwtmanager.verifyToken, async (req, res) => {
  const olduser = await userManager.getUserByName(req.query.oldname);
  const newuser = await userManager.getUserByName(req.query.newname);
  if (Object.keys(olduser).length == 0 || Object.keys(newuser).length == 1) {
    res.status(404).send("Not found");
    return;
  }
  const result = await userManager.updateName(
    req.query.oldname,
    req.query.newname
  );
  res.send(result);
});

// Change the Password of the user with this Username
// If User not found
// => Error: http status 404 Not found
router.put("/updatepassword", jwtmanager.verifyToken, async (req, res) => {
  const user = await userManager.getUserByName(req.query.name);
  if (Object.keys(user).length == 0) {
    res.status(404).send("Not found");
    return;
  }
  const password = await passwordHash.hash(req.query.password, saltRounds);
  const result = await userManager.updatePassword(req.query.name, password);
  res.send(result);
});

// Change
// wenn user nicht gefunden
// => Fehler http status 404 Not found
router.put("/updatebilder", jwtmanager.verifyToken, async (req, res) => {
  const user = await userManager.getUserByName(req.query.name);
  if (Object.keys(user).length == 0 || req.query.newAnz < 0) {
    res.status(404).send("Not found");
    return;
  }
  const result = await userManager.updateAnzBild(
    req.query.name,
    req.query.newAnz
  );
  res.send(result);
});

// Delete that User with this ID
// If User not found
// => Error: http status 404 Not found
router.delete("/deletebyid", jwtmanager.verifyToken, async (req, res) => {
  const user = await userManager.getSingleUser(req.query.id);
  if (Object.keys(user).length == 0) {
    res.status(404).send("Not found");
    return;
  }
  const result = await userManager.deleteUserById(req.query.id);
  res.send(result);
});

// Delete User with this Username
// If User not found
// => Error: http status 404 Not found
router.delete("/deletebyname", jwtmanager.verifyToken, async (req, res) => {
  const user = await userManager.getUserByName(req.query.name);
  if (Object.keys(user).length == 0) {
    res.status(404).send("Not found");
    return;
  }
  const result = await userManager.deleteUserByName(req.query.name);
  res.send(result);
});





module.exports = router;
