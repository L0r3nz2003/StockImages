const userService = require("../services/user_service.js");

class UserManagement{
    getAllUsers = async () => {
        const user = await userService.getAllUsers();
        return user;
    }

    getSingleUser = async (id) => {
        const user = await userService.getSingleUser(id);
        return user;
    }

    getUserByName = async (name) => {
        const user = await userService.getUserByName(name);
        return user;
    }

    checkIfUserExists = async (name, password) => {
        const user = await userService.getUserByNameAndPassword(name, password);
        return user;
    }

    createUser = async (user) => {
        const meldung = await userService.createUser(user);
        return meldung;
      }

      updateUser = async (id, user) => {
        const meldung = await userService.updateUser(id, user);
        return meldung;
    }

    deleteUser = async (id) => {
        const meldung = await userService.deleteUser(id);
        return meldung;
    }


}

module.exports = new UserManagement();