import express from "express";
import * as taskController from "../controllers/taskController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { checkTaskExists } from "../middlewares/checkTaskExists.js";
import { validateTagId } from "../middlewares/validateTagId.js";
import { validateCreateTask, validateUpdateTask } from "../middlewares/validateTask.js";
import { validateCreateComment, validateUpdateComment } from "../middlewares/validateComment.js";
import { checkCommentExists } from "../middlewares/checkCommentExists.js";
import { validateCommentIdParam } from "../middlewares/validateCommentIdParam.js";

const router = express.Router();

router.get("/", asyncHandler(taskController.getTasks));
router.get("/stats", asyncHandler(taskController.getTaskStats));
router.get("/:id", validateIdParam, checkTaskExists, asyncHandler(taskController.getTaskById));
router.post("/", validateCreateTask, asyncHandler(taskController.createTask));
router.put("/:id", validateIdParam, checkTaskExists, validateUpdateTask, asyncHandler(taskController.updateTask));
router.patch("/:id", validateIdParam, checkTaskExists, validateUpdateTask, asyncHandler(taskController.patchTask));
router.delete("/:id", validateIdParam, checkTaskExists, asyncHandler(taskController.deleteTask));

// TAGS
router.get("/:id/tags", validateIdParam, checkTaskExists, asyncHandler(taskController.getTagsByTask));
router.post("/:id/tags", validateIdParam, checkTaskExists, validateTagId, asyncHandler(taskController.addTagToTask));
router.delete("/:id/tags", validateIdParam, checkTaskExists, validateTagId, asyncHandler(taskController.removeTagFromTask));

// COMMENTS
router.get("/:id/comments", validateIdParam, checkTaskExists, asyncHandler(taskController.getCommentsByTask));
router.post("/:id/comments", validateIdParam, checkTaskExists, validateCreateComment, asyncHandler(taskController.createComment));
router.put("/:id/comments/:commentId", validateIdParam, checkTaskExists, validateCommentIdParam, checkCommentExists, validateUpdateComment, asyncHandler(taskController.updateComment));
router.delete("/:id/comments/:commentId", validateIdParam, checkTaskExists, validateCommentIdParam, checkCommentExists, asyncHandler(taskController.deleteComment));

export default router;

/*
Define as routes para as operações relacionadas com as tasks.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/