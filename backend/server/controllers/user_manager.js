const userService = require("../services/user_service.js");

const jwtmanager = require("../controllers/jwt_manager");

const passwordHash = require("bcrypt");
const saltRounds = 10;

class UserManagement {

  // shows all users or a user with given ID
  showUsers = async (req, res) => {
    // 0 - load all users
    if (req.query.id == null) {
      const result = await userService.getAllUsers();
      if (Object.keys(result).length == 0) res.status(404).send("Not found");
      if (result) res.send(result);
      return;
    }
    // 1 - load user from userid
    const result = await userService.getSingleUser(req.query.id);
    console.log(Object.keys(result).length);
    if (Object.keys(result).length == 0) res.status(404).send("Not found");
    if (result) res.send(result);
  };

  // check if this name or email is allready used
  checkUserUniqe = async (req, res) => {
    // 0 - check if name or email is allready used 
    const name = await userService.getUserByName(req.query.name);
    const mail = await userService.getUserByEmail(req.query.email);
    if (name[0] == undefined && mail[0] == undefined) {
      res.sendStatus(200);
      return;
    }
    res.sendStatus(409);
  };

  // check if user exist
  checkIfUserExists = async (req, res) => {
    // 0 - check if this is the right password for this email or this email exist
    const result = await userService.getUserByEmail(req.query.email);
    if (result.length == 0 || !(await passwordHash.compare(String(req.query.password), String(result[0].Password)))) {
      res.status(404).send("Not found");
      return;
    }
    // 1 - create token
    const tokenData = {
      id: result[0].UserId,
      username: result[0].UserName,
      email: result[0].email
    }
    const verifyToken = await jwtmanager.singToken(tokenData);
    // 2 - create user object and send it back
    const user = {
      name: result[0].UserName,
      email: req.query.email,
      password: req.query.password,
      pics: result[0].Pics,
      token: verifyToken
    };
    res.json(user);
  };

  // create new user
  createUser = async (req, res) => {
    // 0 - check if user exist
    const person = await userManager.getUserByName(req.body.name);
    if (Object.keys(person).length == 1) {
      res.status(404).send("User already exists");
      return;
    }
    // 1 - create new user
    const result = await userService.createUser(req.body);
    res.json(result);
  };









  updateUser = async (id, user) => {
    const meldung = await userService.updateUser(id, user);
    return meldung;
  };

  updatePassword = async (name, password) => {
    const meldung = await userService.updatePassword(name, password);
    return meldung;
  };

  updatePasswordById = async (id, password) => {
    const meldung = await userService.updatePasswordById(id, password);
    return meldung;
  };

  updateName = async (oldname, newname) => {
    const meldung = await userService.updateName(oldname, newname);
    return meldung;
  };

  updateAnzBild = async (name, newAnz) => {
    const meldung = await userService.updateAnzBilder(name, newAnz);
    return meldung;
  };

  updateEmail = async (name, email) => {
    return await userService.updateEmail(name, email);
  };

  deleteUserById = async (id) => {
    const meldung = await userService.deleteUserById(id);
    return meldung;
  };

  deleteUserByName = async (name) => {
    const meldung = await userService.deleteUserByName(name);
    return meldung;
  };
}

module.exports = new UserManagement();
