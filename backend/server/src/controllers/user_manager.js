const userService = require("../services/user_service.js");

const jwtmanager = require("./jwt_manager");

const passwordHash = require("bcrypt");

class UserManagement {

  // shows all users or a user with given ID
  showUsers = async (req, res, next) => {
    try {
      // 0 - load all users
      if (req.query.id == null) {
        const result = await userService.getAllUsers();
        if (Object.keys(result).length == 0) res.status(404).send("Not found");
        if (result) res.send(result);
        return;
      }

      // 1 - load user from userid
      const result = await userService.getSingleUser(req.query.id);
      if (Object.keys(result).length == 0) res.status(404).send("Not found");
      if (result) res.send(result);
    } catch (error) {
      next(error);
    }
  };

  // check if this name or email is allready used
  checkUserUniqe = async (req, res, next) => {
    try {
      // 0 - check if name or email is allready used 
      const name = await userService.getUserByName(req.query.name);
      const mail = await userService.getUserByEmail(req.query.email);
      if (name[0] == undefined && mail[0] == undefined) {
        res.sendStatus(200);
        return;
      }
      res.sendStatus(409);
    } catch (error) {
      next(error);
    }
  };

  // check if user exist
  checkIfUserExists = async (req, res, next) => {
    try {
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
        id: result[0].UserId,
        name: result[0].UserName,
        email: req.query.email,
        password: req.query.password,
        pics: result[0].Pics,
        token: verifyToken
      };
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // create new user
  createUser = async (req, res, next) => {
    try {
      // 0 - check if user exist
      const person = await userManager.getUserByName(req.body.name);
      if (Object.keys(person).length == 1) {
        res.status(404).send("User already exists");
        return;
      }

      // 1 - create new user
      const result = await userService.createUser(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // Change complete user with this id
  changeUser = async (req, res, next) => {
    try {
      // 0 - check if user exist
      const user = await userService.getSingleUser(req.query.id);
      if (Object.keys(user).length == 0) {
        res.status(404).send("Not found");
        return;
      }

      // 1 - change user
      const result = await userService.updateUser(req.query.id, req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  // Change Username
  changeUserName = async (req, res, next) => {
    try {
      // 0 - Check if user exist and Check if new name is available
      const olduser = await userService.getUserByName(req.query.oldname);
      const newuser = await userService.getUserByName(req.query.newname);
      if (Object.keys(olduser).length == 0 || Object.keys(newuser).length == 1) {
        res.status(404).send("Not found");
        return;
      }

      // 1 - Change Username
      const result = await userService.updateName(req.query.oldname, req.query.newname);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  // Delete User
  deleteUser = async (req, res, next) => {
    try {
      // 0 - Check if user exist
      const user = await userService.getSingleUser(req.query.id);
      if (Object.keys(user).length == 0) {
        res.status(404).send("Not found");
        return;
      }

      // 1 - Delete User
      const result = await userService.deleteUserById(req.query.id);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

}

module.exports = new UserManagement();
