require("dotenv").config();
const connection = require("./config/db-connection");
const customExpress = require("./config/custom-express");

const PORT = process.env.PORT || 3000;

connection.connect((error) => {
  if (error) throw error;

  const app = customExpress();
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
});
