const express = require("express");
const path = require("path");
const credentials = require("../middleware/credentials");
const cors = require("cors");
const corsOptions = require("./cors-options");
const cookieParser = require("cookie-parser");
const verifyJWT = require("../middleware/verify-jwt");
const logger = require("../middleware/log-requests");

module.exports = () => {
  const app = express();

  // Requests logger
  app.use(logger);

  // Handle options credentials check - before CORS!
  // and fetch cookies credentials requirement
  app.use(credentials);

  // Cross Origin Resource Sharing
  app.use(cors(corsOptions));

  // middleware parsers
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  // serve static files for angular app
  app.use(
    "/",
    express.static(
      path.join(__dirname, "..", "..", "..", "frontend", "dist", "angular-app")
    )
  );

  // routes
  app.use("/register", require("../routes/register"));
  app.use("/login", require("../routes/login"));
  app.use("/logout", require("../routes/logout"));
  app.use("/refresh", require("../routes/refresh"));

  app.use("/vehicles", require("../routes/api/vehicles"));
  app.use("/vehiclesData", require("../routes/api/vehicles-data"));
  app.use("/users", verifyJWT, require("../routes/api/users"));

  app.use("/", require("../routes/angular-app"));

  return app;
};
