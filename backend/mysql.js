mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mysql.dvs-plattling.de",
  port: "3306",
  user: "leigenst",
  password: "leigenst",
  database: "db_leigenst",
});

connection.connect((error) => {
  if (error) throw error;
});

module.exports = connection;
