import express from "express";
import * as taskController from "../controllers/taskController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { checkTaskExists } from "../middlewares/checkTaskExists.js";
import { checkUserExistsForTask } from "../middlewares/checkUserExistsForTask.js";

const router = express.Router();

router.get("/", asyncHandler(taskController.getTasks));
router.get("/stats", asyncHandler(taskController.getTaskStats));
router.get("/:id", validateIdParam, checkTaskExists, asyncHandler(taskController.getTaskById));
router.post("/", checkUserExistsForTask, asyncHandler(taskController.createTask));
router.put("/:id", validateIdParam, checkTaskExists, checkUserExistsForTask, asyncHandler(taskController.updateTask));
router.patch("/:id", validateIdParam, checkTaskExists, checkUserExistsForTask, asyncHandler(taskController.patchTask));
router.delete("/:id", validateIdParam, checkTaskExists, asyncHandler(taskController.deleteTask));
router.get("/user/:id", asyncHandler(taskController.getTasksByUser));

// TAGS
router.get("/:id/tags", validateIdParam, checkTaskExists, asyncHandler(taskController.getTagsByTask));
router.post("/:id/tags", validateIdParam, checkTaskExists, asyncHandler(taskController.addTagToTask));
router.delete("/:id/tags", validateIdParam, checkTaskExists, asyncHandler(taskController.removeTagFromTask));

// COMMENTS
router.get("/:id/comments", validateIdParam, checkTaskExists, asyncHandler(taskController.getCommentsByTask));
router.post("/:id/comments", validateIdParam, checkTaskExists, asyncHandler(taskController.createComment));
router.put("/:id/comments/:commentId", validateIdParam, asyncHandler(taskController.updateComment));
router.delete("/:id/comments/:commentId", validateIdParam, asyncHandler(taskController.deleteComment));

export default router;

/*
Define as routes para as operações relacionadas com as tasks.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/