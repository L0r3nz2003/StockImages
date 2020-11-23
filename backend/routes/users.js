const e = require("express");
const express = require("express");
const router  = express.Router();
const userManager = require("../controllers/user_manager");

const passwordHash = require("bcrypt");
const saltRounds = 10;

router.get("/show", async (req, res) => {
  const result = await userManager.getAllUsers();
  if(Object.keys(result).length == 0){
    res.status(404).send('Not found');
    return;
  }
  res.send(result);
});

router.get("/show/:id", async (req, res) => {
  const result = await userManager.getSingleUser(req.params.id);
  if(Object.keys(result).length == 0){
    res.status(404).send('Not found');
    return;
  }
  res.send(result);
});

router.get("/showbyname/:name", async (req, res) => {
  const result = await userManager.getUserByName(req.params.name);
  if(Object.keys(result).length == 0){
    res.status(404).send('Not found');
    return;
  }
  res.send(result);
});

router.get("/exists/:name/:password", async (req, res) => {
  const password = await userManager.checkIfUserExists(req.params.name);
  if(password.length == 0 || !await passwordHash.compare(String(req.params.password), String(password[0].Password))) {
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.getUserByName(req.params.name);
  res.send(result);
})

router.post("/create", async (req, res) => {
  const person = await userManager.getUserByName(req.body.name);
  if(Object.keys(person).length == 1){
    res.status(404).send("User already exists");
    return;
  }
  const result = await userManager.createUser(req.body);
  res.send(result);
});

router.put("/update/:id", async (req, res) => {
  const user = await userManager.getSingleUser(req.params.id);
  if(Object.keys(user).length == 0){
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.updateUser(req.params.id);
  res.send(result);
});

router.put("/updatename/:oldname/:newname", async (req, res) => {
  const olduser = await userManager.getUserByName(req.params.oldname);
  const newuser = await userManager.getUserByName(req.params.newname);
  if(Object.keys(olduser).length == 0 || Object.keys(newuser).length == 1){
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.updateName(req.params.oldname, req.params.newname);
  res.send(result);
});

router.put("/updatepassword/:name/:password", async (req, res) => {
  const user = await userManager.getUserByName(req.params.name);
  if(Object.keys(user).length == 0){
    res.status(404).send('Not found');
    return;
  }
  const password = await passwordHash.hash(req.params.password, saltRounds);
  const result = await userManager.updatePassword(req.params.name, password);
  res.send(result);
});

router.put("/updatebilder/:name/:newAnz", async (req, res) => {
  const user = await userManager.getUserByName(req.params.name);
  if(Object.keys(user).length == 0 || req.params.newAnz < 0){
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.updateAnzBild(req.params.name, req.params.newAnz);
  res.send(result);
});

router.delete("/deletebyid/:id", async (req, res) => {
  const user = await userManager.getSingleUser(req.params.id);
  if(Object.keys(user).length == 0){
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.deleteUserById(req.params.id);
  res.send(result);
});

router.delete("/deletebyname/:name", async (req, res) => {
  const user = await userManager.getUserByName(req.params.name);
  if(Object.keys(user).length == 0){
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.deleteUserByName(req.params.name);
  res.send(result);
});


module.exports = router;