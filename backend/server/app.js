//** Imports */
const express = require("express");
const path = require("path");
const logger = require("morgan");
const httpError = require("http-errors");
require('dotenv').config()

const angular = require("@angular/cli");

//** Routes */

const _app_folder = 'public/';
const app = express();
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
app.use("/mail", require("./routes/mail"));



app.use((req, res, next) => {
  /*const error = new Error('Not Found');
  error.status = 404;*/
  next(httpError(404, 'Path not found'));
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: {
      //message: 'Internal Server Error'
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

/**
 * envirement : DONE
 * routes : DONE
 * interfaces : DONE
 * WEBTOKEN : DONE
 *
 * PHASH : TODO
 */