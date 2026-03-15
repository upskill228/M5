import * as userService from "../services/userService.js";

export const getUsers = (req, res) => {
    const users = userService.getAllUsers();
    res.json(users);
};

export const createUser = (req, res) => {
  try {
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = (req, res) => {
  try {
    const user = userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const toggleUserActive = (req, res) => {
  try {
    const user = userService.toggleUserActive(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export const deleteUser = (req, res) => {
    userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
};