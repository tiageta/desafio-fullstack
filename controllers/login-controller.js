const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  ACCESS_EXPIRE,
  REFRESH_MAX_EXPIRE,
  REFRESH_MIN_EXPIRE,
} = require("../config/token-expire");

const verifyUser = async (req, res) => {
  try {
    const { username, password } = req?.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });

    const foundUser = await User.getOneByParams({ username });
    if (!foundUser) return res.sendStatus(400); // Not registered

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      // check for auto login
      const autoLogin = req.cookies?.rememberme === "true";
      // create JWTs
      const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_EXPIRE }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: autoLogin ? REFRESH_MAX_EXPIRE : REFRESH_MIN_EXPIRE }
      );
      // update user refresh token in db
      User.updateById(foundUser.id, { refreshToken });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      res.json({ accessToken });
    } else res.sendStatus(400); // Wrong credentials
  } catch (error) {
    console.error(error);
  }
};

module.exports = { verifyUser };
