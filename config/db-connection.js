const db = require("mysql2");

const connection = db.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "ba7ec75a83a7c1",
  password: "7eaeef76",
  database: "heroku_c77450bd68ea0f2",
});

module.exports = connection;
