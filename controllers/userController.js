import * as userService from "../services/userService.js";
import { validateSortParam } from "../utils/queryValidators.js";

// GET ALL USERS
export const getUsers = async (req, res) => {
  const { search, sort } = req.query;
  validateSortParam(sort);

  const users = await userService.getAllUsersDB({ search, sort });
  res.json(users);
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  // Middleware checkUserExists already fetched the user and stored it in req.user
  res.json(req.user);
};

// GET USER STATS
export const getUserStats = async (req, res) => {
  const stats = await userService.getUserStatsDB();
  res.json(stats);
};

// POST USER
export const createUser = async (req, res) => {
  const newUser = await userService.createUserDB(req.body);
  res.status(201).json({
    success: true,
    message: "User created",
    user: newUser
  });
};

// PUT USER
export const updateUser = async (req, res) => {
  const updatedUser = await userService.updateUserDB(req.params.id, req.body);
  res.json({
    success: true,
    message: "User updated",
    user: updatedUser
  });
};

// PATCH
export const patchUser = async (req, res) => {
  const updatedUser = await userService.updateUserPartialDB(req.params.id, req.body);
  res.json({
    success: true,
    message: "User updated partially",
    user: updatedUser
  });
};

// DELETE USER
export const deleteUser = async (req, res) => {
  const result = await userService.deleteUserDB(req.params.id);
  res.json(result);
};

/*
Este userController é utilizado na userRoutes.js para lidar com as requisições relacionadas aos users.
O try and catch não são necessários aqui porque os erros são tratados nos serviços e propagados para os middlewares de erro.
As operações de GET, POST, PUT e DELETE são realizadas utilizando os serviços correspondentes.
Fornece feedback adequado de status.
*/