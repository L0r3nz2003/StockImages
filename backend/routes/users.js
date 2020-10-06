const express = require("express");
const router  = express.Router();
const db      = require("../mysql");

router.get("/", (req, res) => {
  db.query("select * from PsUser ", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

router.post("/create", (req, res) => {
  /*db.query(
    "insert into users(name) values ('" + req.body.name + "')",
    (err) => {
      if (err) throw err;
    }
  );*/
  res.send("Added name into db");
});

router.put("/update/:id", (req, res) => {
  /*db.query(
    "update users set name = '" + req.body.name + "' where id=" + req.params.id,
    (err) => {
      if (err) throw err;
    }
  );*/
  res.send("Updated db");
});

router.delete("/delete/:id", (req, res) => {
  /*db.query("delete from users where id=" + req.params.id, (err) => {
    if (err) throw err;
  });*/
  res.send("Deleted");
});

module.exports = router;
