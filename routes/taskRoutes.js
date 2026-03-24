import express from "express";
import * as taskController from "../controllers/taskController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { checkTaskExists } from "../middlewares/checkTaskExists.js";
import { checkUserExistsForTask } from "../middlewares/checkUserExistsForTask.js";
import { validateSortParam } from "../utils/queryValidators.js";

const router = express.Router();

router.get("/", asyncHandler(taskController.getTasks));
router.get("/stats", asyncHandler(taskController.getTaskStats));
router.get("/:id", validateIdParam, checkTaskExists, asyncHandler(taskController.getTaskById));
router.post("/", checkUserExistsForTask, asyncHandler(taskController.createTask));
router.put("/:id", validateIdParam, checkTaskExists, checkUserExistsForTask, asyncHandler(taskController.updateTask));
router.patch("/:id", validateIdParam, checkTaskExists, checkUserExistsForTask, asyncHandler(taskController.patchTask));
router.delete("/:id", validateIdParam, checkTaskExists, asyncHandler(taskController.deleteTask));
router.get("/user/:id", asyncHandler(taskController.getTasksByUser));
router.get("/:id/tags", asyncHandler(taskController.getTagsByTask));

export default router;

/*
Define as routes para as operações relacionadas com as tasks.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/