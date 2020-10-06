mysql = require("mysql");

const connection = mysql.createConnection({
  host: "192.168.48.21",
  port: "3306",
  user: "leigenst",
  password: "leigenst",
  database: "db_leigenst",
});

connection.connect((error) => {
  if (error) throw error;
});

module.exports = connection;
