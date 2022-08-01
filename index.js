require("dotenv").config();
const pool = require("./config/db-connection");

const customExpress = require("./config/custom-express");

const PORT = process.env.PORT || 3000;

const app = customExpress();

pool.getConnection((error, connection) => {
  if (error) throw error; // not connected!

  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  connection.release();
});
