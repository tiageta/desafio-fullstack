const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  fullName: user.fullName,
  registerDate: user.registerDate,
});

const createNewUser = async (req, res) => {
  const { username, password, email, fullName } = req?.body;

  if (!username || !password || !email || !fullName)
    return res
      .status(400)
      .json({ message: "Missing required unique information." });

  const duplicateUser = await User.getOneByParams({ username });
  if (duplicateUser)
    return res.status(400).json({ message: "User already exists." });

  try {
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = { username, password: hashedPassword, email, fullName };
    // store it in db
    const createdUser = await User.create(newUser);

    res.status(201).json(sanitizeUser(createdUser));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.getAll();
  if (!users.length)
    return res.status(404).json({ message: "No users found." });

  const sanitezedUsers = users.map((user) => sanitizeUser(user));
  res.json(sanitezedUsers);
};

const getUserById = async (req, res) => {
  const id = parseInt(req?.params?.id);
  if (!id) return res.status(400).json({ message: "ID parameter required." });

  const user = await User.getOneByParams({ id });
  if (!user)
    return res.status(404).json({ message: `No user matches ID ${id}.` });

  res.json(sanitizeUser(user));
};

const verifyUser = async (req, res) => {
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
    // create JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // update user refresh token in db
    User.updateById(foundUser.id, { refreshToken });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else res.sendStatus(400); // Wrong credentials
};

const updateUserById = async (req, res) => {
  const id = parseInt(req?.params?.id);
  if (!id) return res.status(400).json({ message: "ID parameter required." });

  const user = await User.getOneByParams({ id });
  if (!user)
    return res.status(404).json({ message: `No user matches ID ${id}.` });

  const updatedUser = await User.updateById(id, req.body);
  res.json(sanitizeUser(updatedUser));
};

const deleteUserById = async (req, res) => {
  const id = parseInt(req?.params?.id);
  if (!id) return res.status(400).json({ message: "ID parameter required." });

  const user = await User.getOneByParams({ id });
  if (!user)
    return res.status(404).json({ message: `No user matches ID ${id}.` });

  const deletedUserId = await User.deleteById(id);
  res.json(deletedUserId);
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  verifyUser,
  updateUserById,
  deleteUserById,
};
