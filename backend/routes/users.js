const e = require("express");
const express = require("express");
const router  = express.Router();
const userManager = require("../controllers/user_manager");

const passwordHash = require("bcrypt");
const saltRounds = 10;

router.get("/show", async (req, res) => {
  const result = await userManager.getAllUsers();
  res.send(result);
});

router.get("/show/:id", async (req, res) => {
  const result = await userManager.getSingleUser(req.params.id);
  res.send(result);
});

router.get("/showbyname/:name", async (req, res) => {
  const result = await userManager.getUserByName(req.params.name);
  res.send(result);
});

router.get("/exists/:name/:password", async (req, res) => {
  const password = await userManager.checkIfUserExists(req.params.name);
  const match = await passwordHash.compare(String(req.params.password), String(password[0].Password));
  if(!match) {
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.getUserByName(req.params.name);
  res.send(result);
})

router.post("/create", async (req, res) => {
  const result = await userManager.createUser(req.body);
  res.send(result);
});

router.put("/update/:id", async (req, res) => {
  const result = await userManager.updateUser(req.params.id, req.body);
  res.send(result);
});

router.put("/updatePassword/:name/:password", async (req, res) => {
  const password = await passwordHash.hash(req.params.password, saltRounds);
  const result = await userManager.updatePassword(req.params.name, password);
  res.send(result);
});

router.delete("/delete/:id", async (req, res) => {
  //return res.send({"massage": "works"});
  const result = await userManager.deleteUser(req.params.id);
  res.send(result);
});


module.exports = router;