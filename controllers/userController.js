import * as userService from "../services/userService.js";

// GET USERS
export const getUsers = (req, res) => {
  try {
    const sort = req.query.sort;
    const search = req.query.search;
    const users = userService.getAllUsers(sort, search);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET STATS
export const getUserStats = (req, res) => {
  const stats = userService.getUserStats();
  res.json(stats);
};

// POST USER
export const createUser = (req, res) => {
  try {
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT USER
export const updateUser = (req, res) => {
  try {
    const user = userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// TOGGLE USER ACTIVE
export const toggleUserActive = (req, res) => {
  try {
    const user = userService.toggleUserActive(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// DELETE USER
export const deleteUser = (req, res) => {
    userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
};