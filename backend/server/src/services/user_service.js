const db = require("../database/mysql.js");

const passwordHash = require("bcrypt");
const saltRounds = 10;

class UserService {
  getAllUsers = async () => {
    const rows = await this.runQuery("select * from PsUser");
    return rows;
  };

  getUserByName = async (name) => {
    const rows = await this.runQuery("select * from PsUser where UserName = ?", [name]);
    return rows;
  };

  getSingleUser = async (id) => {
    const row = await this.runQuery("select * from PsUser where UserId = ?", id);
    return row;
  };

  getUserByEmail = async (email) => {
    return await this.runQuery("select * from PsUser where email = ?", email);
  };

  getUserByNameAndPassword = async (name) => {
    const pw = await this.runQuery("select Password from PsUser where UserName = ?", [name]);
    return pw;
  };

  getUserPasswordByEmail = async (email) => {
    const pw = await this.runQuery("select Password from PsUser where email = ?", [email]);
    return pw;
  };

  createUser = async (user) => {
    await this.runQuery(
      "insert into PsUser (UserName, email, Password, Pics) values" +
      "(?, ?, ?, ?)",
      [user.name, user.email, await passwordHash.hash(user.password.trim(), saltRounds), user.pics,]
    );

    return "INSERT Successfull";
  };

  updateUser = async (id, user) => {
    await this.runQuery("update PsUser set " + "UserName = ? WHERE UserId = ?", [user.name, id]);
    return "UPDATE Successfull";
  };

  updatePassword = async (name, password) => {
    await this.runQuery("update PsUser set Password = ? where UserName = ?", [password, name,]);
    return "Password Update Successfull";
  };

  updatePasswordById = async (id, password) => {
    await this.runQuery("update PsUser set Password = ? where UserId = ?", [password, id,]);
    return "Password Update Successfull";
  };

  updateName = async (oldname, newname) => {
    await this.runQuery("update PsUser set Username = ? where UserName = ?", [newname, oldname,]);
    return "UserName Update Successfull";
  };

  updateAnzBilder = async (name, newAnz) => {
    await this.runQuery("update PsUser set Pics = ? where UserName = ?", [newAnz, name,]);
    return "AnzBilder Update Successfull";
  };

  updateEmail = async (name, email) => {
    await this.runQuery("update PsUser set = ? email where UserName = ?", [email, name,]);
    return "Email Update Successfull";
  };

  deleteUserById = async (id) => {
    await this.runQuery("delete from PsUser where UserId = ?", [id]);
    return "DELETE Successfull";
  };

  deleteUserByName = async (Name) => {
    await this.runQuery("delete from PsUser where UserName = ?", [Name]);
    return "DELETE Successfull";
  };

  runQuery = async (str, replacements) => {
    return new Promise((resolve) => {
      db.query(str, replacements, (err, rows) => {
        if (err) rejects(err.toString());
        resolve(rows);
      });
    });
  };
}

module.exports = new UserService();
