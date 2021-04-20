const e = require("express");
const express = require("express");
const router = express.Router();
const userManager = require("../controllers/user_manager");

const jwtmanager = require("../controllers/jwt_manager");

const passwordHash = require("bcrypt");
const saltRounds = 10;


// Return User with this ID | IF ID is null => return all user
// if Error: http status 404 Not found
router.get("/show", jwtmanager.verifyToken, async (req, res) => {
  let result = "";
  if (req.query.id == null) {
    result = await userManager.getAllUsers();
  } else {
    result = await userManager.getSingleUser(req.query.id);
  }
  if (Object.keys(result).length == 0) {
    res.status(404).send('Not found');
    return;
  }
  res.send(result);

});

// Return User with this name
// if Error: http status 404 Not found
router.get("/showbyname", jwtmanager.verifyToken, async (req, res) => {
  const result = await userManager.getUserByName(req.query.name);
  if (Object.keys(result).length == 0) {
    res.status(404).send('Not found');
    return;
  }
  res.send(result);
});

// Return User with this name if the password id correct
// if Error: http status 404 Not found
router.get("/exists", jwtmanager.verifyToken, async (req, res) => {
  console.log("Start....");
  const password = await userManager.checkIfUserExists(req.query.name);
  if (password.length == 0 || !await passwordHash.compare(String(req.query.password), String(password[0].Password))) {
    res.status(404).send('Not found');
    return;
  }

  const result = await userManager.getUserByName(req.query.name);

  const user = {
    id: result[0].UserId,
    username: result[0].UserName
  }

  console.log("Token angefragt...");

  const token = await jwtmanager.singToken(user);

  res.json({
    message: 'loged in',
    pics: result[0].Pics,
    token: token
  });
  console.log("....Ende");
})

// Create new User, id is Autoincrement
// Needs a complete User object
// If User already exists
// => Error 404 User already exists
router.post("/create", jwtmanager.verifyToken, async (req, res) => {
  const person = await userManager.getUserByName(req.body.name);
  if (Object.keys(person).length == 1) {
    res.status(404).send("User already exists");
    return;
  }
  const result = await userManager.createUser(req.body);
  res.send(result);
});

// Change the User with this ID 
// Needs a complete User object
// if Error: http status 404 Not found
router.put("/update", jwtmanager.verifyToken, async (req, res) => {
  const user = await userManager.getSingleUser(req.query.id);
  if (Object.keys(user).length == 0) {
    res.status(404).send('Not found');
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
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.updateName(req.query.oldname, req.query.newname);
  res.send(result);
});

// Change the Password of the user with this Username
// If User not found 
// => Error: http status 404 Not found
router.put("/updatepassword", jwtmanager.verifyToken, async (req, res) => {
  const user = await userManager.getUserByName(req.query.name);
  if (Object.keys(user).length == 0) {
    res.status(404).send('Not found');
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
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.updateAnzBild(req.query.name, req.query.newAnz);
  res.send(result);
});

// Delete that User with this ID
// If User not found 
// => Error: http status 404 Not found
router.delete("/deletebyid", jwtmanager.verifyToken, async (req, res) => {
  const user = await userManager.getSingleUser(req.query.id);
  if (Object.keys(user).length == 0) {
    res.status(404).send('Not found');
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
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.deleteUserByName(req.query.name);
  res.send(result);
});


module.exports = router;