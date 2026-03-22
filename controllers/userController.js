import * as userService from "../services/userService.js";
import { ValidationError } from "../utils/validationError.js";

// GET USERS
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersDB();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST USER
export const createUser = async (req, res) => {
  try { 
    const { name, email, active } = req.body;
    const newUser = await userService.createUserDB(name, email, active);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error instanceof ValidationError ? 400 : 500)
       .json({ error: error.message });
  }
};

// PUT USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, active } = req.body;

    const result = await userService.updateUserDB(id, name, email, active);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated" });
  } catch (error) {
    res.status(error instanceof ValidationError ? 400 : 500)
       .json({ error: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUserDB(id);

    if (result.affectedRows > 0) {
      return res.json({ message: "User deleted" });
    }

    res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};