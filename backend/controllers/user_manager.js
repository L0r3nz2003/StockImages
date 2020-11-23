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

    checkIfUserExists = async (name) => {
        const password = await userService.getUserByNameAndPassword(name);
        return password;
    }

    createUser = async (user) => {
        const meldung = await userService.createUser(user);
        return meldung;
    }

    updateUser = async (id, user) => {
        const meldung = await userService.updateUser(id, user);
        return meldung;
    }

    updatePassword = async (name, password) => {
        const meldung = await userService.updatePassword(name, password);
        return meldung;
    }

    updateName = async (oldname, newname) => {
        const meldung = await userService.updateName(oldname, newname);
        return meldung;
    }

    updateAnzBild = async (name, newAnz) => {
        const meldung = await userService.updateAnzBilder(name, newAnz);
        return meldung;
    }

    deleteUserById = async (id) => {
        const meldung = await userService.deleteUserById(id);
        return meldung;
    }

    deleteUserByName = async (name) => {
        const meldung = await userService.deleteUserByName(name);
        return meldung;
    }


}

module.exports = new UserManagement();