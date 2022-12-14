const User = require("../models/User");
const bcrypt = require("bcrypt");

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  fullName: user.fullName,
  registerDate: user.registerDate,
});

const createNewUser = async (req, res) => {
  try {
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

      res.status(201).json({ data: sanitizeUser(createdUser) });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    if (!users?.length)
      return res.status(404).json({ message: "No users found." });

    const sanitezedUsers = users.map((user) => sanitizeUser(user));
    res.json({ data: sanitezedUsers });
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const user = await User.getOneByParams({ id });
    if (!user)
      return res.status(404).json({ message: `No user matches ID ${id}.` });

    res.json({ data: sanitizeUser(user) });
  } catch (error) {
    console.error(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const user = await User.getOneByParams({ id });
    if (!user)
      return res.status(404).json({ message: `No user matches ID ${id}.` });

    const updatedUser = await User.updateById(id, req.body);
    res.json({ data: sanitizeUser(updatedUser) });
  } catch (error) {
    console.error(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const user = await User.getOneByParams({ id });
    if (!user)
      return res.status(404).json({ message: `No user matches ID ${id}.` });

    const deletedUser = await User.deleteById(id);
    res.json({ data: sanitizeUser(deletedUser) });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
