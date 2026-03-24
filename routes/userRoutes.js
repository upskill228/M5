import express from "express";
import * as userController from "../controllers/userController.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { validateCreateUser, validateUpdateUser } from "../middlewares/validateUser.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(userController.getUsers));
router.get("/stats", asyncHandler(userController.getUserStats));
router.post("/", validateCreateUser, asyncHandler(userController.createUser));
router.put("/:id", validateIdParam, checkUserExists, validateUpdateUser, asyncHandler(userController.updateUser));
router.patch("/:id", validateIdParam, checkUserExists, validateUpdateUser, asyncHandler(userController.patchUser));
router.delete("/:id", validateIdParam, checkUserExists, asyncHandler(userController.deleteUser));
router.get("/:id/tasks", validateIdParam, checkUserExists, asyncHandler(userController.getTasksByUser));

export default router;

/*
Define as routes para as operações relacionadas com os users.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/