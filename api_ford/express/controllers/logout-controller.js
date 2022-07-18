const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {
  // Is there a cookie?
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content

  // Is refreshToken in db
  const refreshToken = cookies.jwt;
  const foundUser = await User.getOneByParams({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // Delete token in db
  User.updateById(foundUser.id, { refreshToken: "" });

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
