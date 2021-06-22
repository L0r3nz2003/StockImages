const db = require("../database/dbRunner.js");
const Image = require("../classes/image");

class ImgService {

  getAllImg = async () => {
    return await db.runQuery("select * from PsImage");
  };

  getSingleImg = async (id) => {
    return await db.runQuery("select * from PsImage where id = ?", [id]);
  };

  getImgName = async (id) => {
    return await db.runQuery("select FileName from PsImage where id = ?", [id]);
  };

  getUidFromImgId = async (id) => {
    return await db.runQuery("select userId from PsImage where id = ?", [id]);
  }

  getUserImg = async (userid) => {
    return await db.runQuery("select * from PsImage where userId = ?", [userid]);
  };
  getImgId = async (fileName, userId, timestamp) => {
    return await db.runQuery("select id from PsImage where FileName = ? and userId = ? and uploadTime = ?", [fileName, userId, timestamp]);
  };

  getImgByTag = async (tag) => {
    return await db.runQuery("select * from PsImage where Tags like ?", ["%" + tag + "%"]);
  };

  // compare the given hash to everyone in de database with hermingsistance lower than 4
  // with own coded function in mysql
  getImgByPhash = async (phash) => {
    return await db.runQuery("select *, hamdist(p_hash, ?) as hamdist from PsImage having hamdist < 4", [phash]);
  };

  createImg = async (image = new Image()) => {
    await db.runQuery(
      "insert into PsImage (FileName, uploadTime, beschreibung, userId, Tags, p_hash) values" +
      "(?, ?, ?, ?, ?, ?)",
      [image.filename, image.uploadTime, image.beschreibung, image.uid, image.tags, image.hashValue]
    );
    return "INSERT Successfull";
  };

  updateImg = async (id, img) => {
    await db.runQuery(
      "update  PsImage set FileName = ?, uplaodTime = ?, beschreibung = ?, userId = ?  where id = ?" +
      "(?, ?, ?, ?)",
      [img.time, img.beschreibung, img.userid, id]
    );
    return "UPDATE Successfull";
  };

  deleteImgById = async (id) => {
    await db.runQuery("delete from PsImage where id = ?", [id]);
    return "Delete Successfull";
  };

  deleteImgByUserId = async (userId) => {
    await db.runQuery("delete from PsImage where userId = ?", [userId]);
    return "Delete Successfull";
  };


}

module.exports = new ImgService();
