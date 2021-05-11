//** Imports */
const express = require("express");
const path = require("path");
const logger = require("morgan");
require('dotenv').config()

const angular = require("@angular/cli");

//** Routes */

const _app_folder = 'public/';
let app = express();
const env = process.env.NODE_ENV;

app.use(logger('dev'));
app.use(express.json());                             // for parsing application/json
app.use(express.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded
// EJS
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routen
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/img", require("./routes/image"));
app.use("/api", require("./routes/jwt"));
app.use("/mail", require("./routes/mail"));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

