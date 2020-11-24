const e = require("express");
const express = require("express");
const router  = express.Router();
const userManager = require("../controllers/user_manager");

const passwordHash = require("bcrypt");
const saltRounds = 10;

// Es werden alle vorhandenen User zurüchgegeben
router.get("/show", async (req, res) => {
  const result = await userManager.getAllUsers();
  if(Object.keys(result).length == 0){
    res.status(404).send('Not found');
    return;
  }
  res.send(result);
});

// Es wird der User mit dieser genauen id zurüchgegeben
// bei Fehler http status 404 Not found
router.get("/show/:id", async (req, res) => {
  const result = await userManager.getSingleUser(req.params.id);
  if(Object.keys(result).length == 0){
    res.status(404).send('Not found');
    return;
  }
  res.send(result);
});

// Es wird der User mit genau diesem Usernamen zurüchgegeben
// bei Fehler http status 404 Not found
router.get("/showbyname/:name", async (req, res) => {
  const result = await userManager.getUserByName(req.params.name);
  if(Object.keys(result).length == 0){
    res.status(404).send('Not found');
    return;
  }
  res.send(result);
});

// Es wird der User mit dieser genau diesem namen zurüchgegeben wenn das passwort richtig ist
// bei Fehler http status 404 Not found
// -überprüft erst ob user vorhanden dann erst das passwort, wenn user nicht da wird auch das paswort nicht grprüft und gleich der fehler geworfen
router.get("/exists/:name/:password", async (req, res) => {
  const password = await userManager.checkIfUserExists(req.params.name);
  if(password.length == 0 || !await passwordHash.compare(String(req.params.password), String(password[0].Password))) {
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.getUserByName(req.params.name);
  res.send(result);
})

// erstellt einen neuen user, id wird von der DB automatisch erzeugt
// erfordert ganzes user objekt
// wenn user schon vorhanden
// => Fehler 404 User already exists

router.post("/create", async (req, res) => {
  const person = await userManager.getUserByName(req.body.name);
  if(Object.keys(person).length == 1){
    res.status(404).send("User already exists");
    return;
  }
  const result = await userManager.createUser(req.body);
  res.send(result);
});

// ändert den user mit genau dieser ID 
// braucht einen ganzen user
// bei Fehler http status 404 Not found
router.put("/update/:id", async (req, res) => {
  const user = await userManager.getSingleUser(req.params.id);
  if(Object.keys(user).length == 0){
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.updateUser(req.params.id);
  res.send(result);
});

// ändert den username eines users
// wenn alter oldname nicht vorhanden oder newname schon belegt
// => // bei Fehler http status 404 Not found
// prüft erst oldname dann new name
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

// ändert das passwort des users mid dem angegebenen username
// wenn user nicht gefunden 
// => Fehler http status 404 Not found
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

// ändert die anzahl der bilder eines users
// wenn user nicht gefunden 
// => Fehler http status 404 Not found
router.put("/updatebilder/:name/:newAnz", async (req, res) => {
  const user = await userManager.getUserByName(req.params.name);
  if(Object.keys(user).length == 0 || req.params.newAnz < 0){
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.updateAnzBild(req.params.name, req.params.newAnz);
  res.send(result);
});

// löscht den user mit der angegebenen id
// wenn user nicht gefunden 
// => Fehler http status 404 Not found
router.delete("/deletebyid/:id", async (req, res) => {
  const user = await userManager.getSingleUser(req.params.id);
  if(Object.keys(user).length == 0){
    res.status(404).send('Not found');
    return;
  }
  const result = await userManager.deleteUserById(req.params.id);
  res.send(result);
});

// löscht den user mit dem angegebenen namen
// wenn user nicht gefunden 
// => Fehler http status 404 Not found
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