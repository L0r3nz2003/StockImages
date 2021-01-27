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
    getImgId = async (fileName, userId, timestamp) => {
        const row = await this.runQuery("select id from PsImage where FileName = ? and userId = ? and uploadTime = ?",
        [fileName, userId, timestamp]);
        return row;
    }

    createImg = async (fileName, uploadTime, beschreibung, userId) => {
        await this.runQuery("insert into PsImage (FileName, uploadTime, beschreibung, userId) values"+
        "(?, ?, ?, ?)",
        [fileName, uploadTime, beschreibung, userId]);
        return "INSERT Successfull";
    }

    updateImg = async (id, img) => {
        await this.runQuery("update  PsImage set FileName = ?, uplaodTime = ?, beschreibung = ?, userId = ?  where id = ?"+
        "(?, ?, ?, ?)",
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


module.exports = new ImgService();