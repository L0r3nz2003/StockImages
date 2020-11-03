const express = require("express");
const router  = express.Router();
const db      = require("../mysql");
const _app_folder = 'public/';

// test seite zum testen
router.get("/test", function(req, res, next) {
  res.sendFile(`test.html`, {root: 'public/'});

});

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
router.get("/create", (req, res) => {
  db.query(
    "insert into PsUser(UserName,Password,AnzahlBilder) values ('testadsfasd','test','1')",
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
router.get('/delete/:id', (req, res) => {
  db.query('delete PsUser where UserId =?', [req.params.id], (err) => {
    if (err) throw err;
  });
  res.send("Deleted");
  console.log("ID löschen: ", req.params.id);
});


module.exports = router;
