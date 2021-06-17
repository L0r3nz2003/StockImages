//** Imports */
const express = require("express");
const logger = require("morgan");
const httpError = require("http-errors");
require('dotenv').config()


//** Routes */

const app = express();

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
app.use("/", require("./src/routes/index"));
app.use("/users", require("./src/routes/users"));
app.use("/img", require("./src/routes/image"));
app.use("/mail", require("./src/routes/mail"));



app.use((req, res, next) => {
  next(httpError(404, 'Path not found'));
});

app.use((err, req, res, next) => {
  if (!process.env.DEBUG_MODE) {
    res.status(500);
    res.json({
      error: {
        message: err.message
      }
    });
  } else {
    res.status(500);
    res.json({
      error: {
        message: 'Internal Server Error'
      }
    });
  }

});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
