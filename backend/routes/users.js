const express = require("express");
const router  = express.Router();
const db      = require("../mysql");

// Aller user werden zurückgegeben
router.get("/", (req, res) => {
  db.query("select * from PsUser ", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// User bei Id zurückgeben
/*router.get('/:id', (req, res) => {
  db.query('select * from PsUser where UserId =?',[req.params.id], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
  console.log("ID: ", req.params.id);
});
*/

// neuer User
router.post("/create", (req, res) => {
  db.query(
    "insert into PsUser(UserName,Password,AnzahlBilder) values ('testadsf','test','1')",
    (err) => {
      if (err) throw err;
    }
  );
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

// User löschen
router.delete('/delete/:id', (req, res) => {
  /*db.query('delete from PsUser where UserId =?', [req.params.id], (err) => {
    if (err) throw err;
  });
  res.send("Deleted");*/
  console.log("ID löschen: ", req.params.id);
});

router.delete('/test', (req, res) => {
  console.log("test");
});

module.exports = router;
