const db = require("../database/dbRunner.js");

const passwordHash = require("bcrypt");

class UserService {

  getAllUsers = async () => {
    return await db.runQuery("select * from PsUser");
  };

  getUserByName = async (name) => {
    return await db.runQuery("select * from PsUser where UserName = ?", [name]);
  };

  getSingleUser = async (id) => {
    return await db.runQuery("select * from PsUser where UserId = ?", id);
  };

  getUserByEmail = async (email) => {
    return await db.runQuery("select * from PsUser where email = ?", email);
  };

  getUserByNameAndPassword = async (name) => {
    return await db.runQuery("select Password from PsUser where UserName = ?", [name]);
  };

  getUserPasswordByEmail = async (email) => {
    return await db.runQuery("select Password from PsUser where email = ?", [email]);
  };

  // create user in database with given user
  createUser = async (user) => {
    await db.runQuery(
      "insert into PsUser (UserName, email, Password, Pics) values" +
      "(?, ?, ?, ?)",
      [user.name, user.email, await passwordHash.hash(user.password.trim(), process.env.SALTROUNDS), user.pics]
    );
    return "INSERT Successfull";
  };

  updateUser = async (id, user) => {
    await db.runQuery("update PsUser set " + "UserName = ? WHERE UserId = ?", [user.name, id]);
    return "UPDATE Successfull";
  };

  updatePassword = async (name, password) => {
    await db.runQuery("update PsUser set Password = ? where UserName = ?", [password, name]);
    return "Password Update Successfull";
  };

  updatePasswordById = async (id, password) => {
    await db.runQuery("update PsUser set Password = ? where UserId = ?", [password, id]);
    return "Password Update Successfull";
  };

  updateName = async (oldname, newname) => {
    await db.runQuery("update PsUser set Username = ? where UserName = ?", [newname, oldname]);
    return "UserName Update Successfull";
  };

  updateAnzBilder = async (name, newAnz) => {
    await db.runQuery("update PsUser set Pics = ? where UserName = ?", [newAnz, name,]);
    return "AnzBilder Update Successfull";
  };

  updateIncreaseImages = async (uid) => {
    await db.runQuery("update PsUser set Pics = Pics+1 where UserId = ?", [uid]);
    return "Increase Pics Successfull";
  }

  updateDecreaseImages = async (uid) => {
    await db.runQuery("update PsUser set Pics = (Pics-1) where UserId = ?", [uid]);
    return "Decrease Pics Successfull";
  }

  updateEmail = async (name, email) => {
    await db.runQuery("update PsUser set = ? email where UserName = ?", [email, name]);
    return "Email Update Successfull";
  };

  deleteUserById = async (id) => {
    await db.runQuery("delete from PsUser where UserId = ?", [id]);
    return "DELETE Successfull";
  };

  deleteUserByName = async (Name) => {
    await db.runQuery("delete from PsUser where UserName = ?", [Name]);
    return "DELETE Successfull";
  };

}

module.exports = new UserService();
