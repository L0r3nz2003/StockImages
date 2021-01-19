const db = require("../database/mysql.js");
const imageManager = require("../controllers/image_manager.js");

class ImgService {
    
    getAllImg = async () => {
        const rows = await this.runQuery("select * from PsImage");
        return rows;
    }

    getSingleImg = async (id) => {
        const row = await this.runQuery("select * from PsImage where id = ?", id);
        return row;
    }

    getUserImg = async (userid) => {
        const row = await this.runQuery("select * from PsImage where userId = ?", userid);
        return row;
    }

    createImg = async (img) => {
        await this.runQuery("insert into PsImage (uplaodTime, beschreibung, userId) values"+
        "(?, ?, ?)",
        [img.time, img.beschreibung, img.userid]);
        return "INSERT Successfull";
    }

    updateImg = async (id, img) => {
        await this.runQuery("update  PsImage set uplaodTime = ?, beschreibung = ?, userId = ?  where id = ?"+
        "(?, ?, ?)",
        [img.time, img.beschreibung, img.userid, id]);
        return "UPDATE Successfull";
    }


    deleteImgById = async (id) => {
        await this.runQuery("delete from PsImage where id = ?", [id]);
        return "Delete Successfull";
    }

    deleteImgByUserId = async (userId) => {
        await this.runQuery("delete from PsImage where userId = ?", [userId]);
        return "Delete Successfull";
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


module.exports = new ImageService();