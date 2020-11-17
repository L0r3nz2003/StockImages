mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mysql.dvs-plattling.de",
  port: "3306",
  user: "jkomma",
  password: "jkomma",
  database: "db_jkomma",
});

connection.connect((error) => {
  if (error) throw error;
});

module.exports = connection;
