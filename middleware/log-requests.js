const logger = (req, res, next) => {
  if (req.path !== "/favicon.ico" && req.method !== "OPTIONS")
    console.log(`${req.method} ${req.path} ${req.hostName}`);
  next();
};

module.exports = logger;
