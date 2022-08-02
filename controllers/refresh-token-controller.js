const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { ACCESS_EXPIRE } = require("../config/token-expire");

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    const foundUser = await User.getOneByParams({ refreshToken });
    if (!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || foundUser.username !== decoded.username)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: ACCESS_EXPIRE }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = { handleRefreshToken };
