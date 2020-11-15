const express = require("express");
const router  = express.Router();
const userManager = require("../controllers/user_manager.js");

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

router.get("/create", async (req, res) => {
  const result = await userManager.createUser(req.body);
  res.send(result);
});

router.get("/update/:id", async (req, res) => {
  const result = await userManager.updateUser(req.params.id, req.body);
  res.send(result);
});

router.get("/delete/:id", async (req, res) => {
  console.log("test");
  const result = await userManager.deleteUser(req.params.id);
  res.send(result);
});


module.exports = router;