import express from "express";
import * as taskController from "../controllers/taskController.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { validateCreateTask, validateUpdateTask } from "../middlewares/validateTask.js";
import { checkTaskExists } from "../middlewares/checkTaskExists.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(taskController.getTasks));
// router.get("/:id", validateIdParam,checkTaskExists, asyncHandler(taskController.getTaskById));
router.get("/stats", asyncHandler(taskController.getTaskStats));
router.post("/", validateCreateTask, asyncHandler(taskController.createTask));
router.put("/:id", validateIdParam, checkTaskExists, validateUpdateTask, asyncHandler(taskController.updateTask));
router.delete("/:id", validateIdParam, checkTaskExists, asyncHandler(taskController.deleteTask));

router.get("/users/:id/tasks", validateIdParam, checkUserExists, asyncHandler(taskController.getTasksByUser)); // ALL the tasks of a specific user -> it's not a especific  task so we don't use CheckTaskExists, but checkUserExists )
export default router;

/*
Define as routes para as operações relacionadas com as tasks.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/