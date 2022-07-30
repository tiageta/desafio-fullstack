const db = require("mysql2");

const pool = db.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_SCHEMA || "ford_api",
});

module.exports = pool;
