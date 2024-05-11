const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "roor",
  password: "",
  database: "crimscity",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

module.exports = db;
