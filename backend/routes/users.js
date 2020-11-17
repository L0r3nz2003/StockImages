const express = require("express");
const router  = express.Router();


const passwordHash = require('password-hash');

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
  const result = await userManager.checkIfUserExists(req.params.name, req.params.password);
  console.log(Object.keys(result).length);
  if(Object.keys(result).length == 0) {
    res.status(404).send('Not found');
    return;
  }
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

router.delete("/delete/:id", async (req, res) => {
  //return res.send({"massage": "works"});
  const result = await userManager.deleteUser(req.params.id);
  res.send(result);
});


module.exports = router;