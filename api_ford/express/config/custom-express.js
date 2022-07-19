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

  //serve static files
  app.use("/", express.static(path.join(__dirname, "../public")));

  // routes
  app.use("/", require("../routes/root"));
  app.use("/register", require("../routes/register"));
  app.use("/login", require("../routes/login"));
  app.use("/logout", require("../routes/logout"));
  app.use("/refresh", require("../routes/refresh"));

  app.use("/vehicles", require("../routes/api/vehicles"));
  app.use("/vehiclesData", require("../routes/api/vehicles-data"));
  app.use(verifyJWT); // users api require auth
  app.use("/users", require("../routes/api/users"));

  return app;
};
