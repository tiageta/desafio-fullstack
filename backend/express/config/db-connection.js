const db = require("mysql2");

const connection = db.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "ford_api",
});

module.exports = connection;
