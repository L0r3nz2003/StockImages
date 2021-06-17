mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) throw error;
});

runQuery = async (str, replacements) => {
  return new Promise((resolve) => {
    db.query(str, replacements, (err, rows) => {
      if (err) rejects(err.toString());
      resolve(rows);
    });
  });
};

module.exports = connection;
