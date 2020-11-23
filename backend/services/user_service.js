const db = require("../database/mysql.js");
const userManager = require("../controllers/user_manager.js");



class UserService{

    getAllUsers = async () => {
        const rows = await this.runQuery("select * from PsUser");
        return rows;
    }

    getUserByName = async (name) => {
        console.log("querry");
        const rows = await this.runQuery("select * from PsUser where UserName = ?", [name]);
        return rows
    }

    getSingleUser = async (id) => {
        const row = await this.runQuery("select * from PsUser where UserId = ?", id);
        return row;
    }

    getUserByNameAndPassword = async (name) => {
        const pw = await this.runQuery("select Password from PsUser where UserName = ?", [name]);
        return pw;
    }

    createUser = async (user) => {
        await this.runQuery("insert into PsUser (UserName, Password, AnzahlBilder) values"+
        "(?, ?, ?)",
        [user.name,user.password,user.anzbilder]);
        return "INSERT Successfull";
    }

    updateUser = async (id, user) => {
        await this.runQuery("update PsUser set "+
        "UserName = ? WHERE UserId = ?",
        [user.name, id]);
        return "UPDATE Successfull";
    }

    updatePassword = async (name, password) => {
        await this.runQuery("update PsUser set Password = ? where UserName = ?", 
        [password, name]);
        return "Password Update Successfull";
    }

    updateName = async (oldname, newname) => {
        await this.runQuery("update PsUser set Username = ? where UserName = ?", 
        [newname, oldname]);
        return "UserName Update Successfull";
    }

    updateAnzBilder = async (name, newAnz) => {
        await this.runQuery("update PsUser set AnzahlBilder = ? where UserName = ?", 
        [newAnz, name]);
        return "AnzBilder Update Successfull";
    }

    deleteUserById = async (id) => {
        await this.runQuery("delete from PsUser where UserId = ?",[id]);
        return "DELETE Successfull";
    }

    deleteUserByName = async (Name) => {
        await this.runQuery("delete from PsUser where UserName = ?",[Name]);
        return "DELETE Successfull";
    }


    runQuery = async (str, replacements) => {
        return new Promise(resolve => {
            db.query(str, replacements, (err, rows) => {
                if (err) rejects(err.toString())
                resolve(rows);
            })
        });
    }

}

module.exports = new UserService();