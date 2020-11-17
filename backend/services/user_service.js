const db = require("../database/mysql.js");

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

    getUserByNameAndPassword = async (name, password) => {
        const row = await this.runQuery("select * from PsUser where UserName = ? and Password = ?", [name, password]);
        return row;
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

    deleteUser = async (id) => {
        await this.runQuery("delete from PsUser where UserId = ?",[id]);
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