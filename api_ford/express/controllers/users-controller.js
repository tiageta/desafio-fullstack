const User = require("../models/User");

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

  const user = await User.create({ ...req.body });

  res.status(201).json(sanitizeUser(user));
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

const verifyUser = async (req, res) => {};

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
