const express = require("express");

module.exports = () => {
  const app = express();

  // parsers
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // routes
  app.use("/vehicles", require("../routes/vehicles"));
  app.use("/vehiclesData", require("../routes/vehicles-data"));
  app.use("/users", require("../routes/users"));

  return app;
};
