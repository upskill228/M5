import { asyncHandler } from "../middlewares/asyncHandler.js";
import * as userService from "../services/userService.js";
import { validateSortParam } from "../utils/queryValidators.js";

// GET ALL USERS
export const getUsers = asyncHandler(async (req, res) => {
  const { search, sort } = req.query;
  validateSortParam(sort);
  const users = await userService.getAllUsersDB({ search, sort });
  res.json(users);
});

// GET USER BY ID
export const getUserById = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// POST USER
export const createUser = asyncHandler(async (req, res) => {
  const newUser = await userService.createUserDB(req.body);
  res.status(201).json(newUser);
});

// PUT USER
export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUserDB(req.params.id, req.body);
  res.json(updatedUser);
});

// DELETE USER
export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUserDB(req.params.id);
  res.status(204).send();
});