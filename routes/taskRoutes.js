import express from "express";
import * as taskController from "../controllers/taskController.js";
import * as commentController from "../controllers/commentController.js";
import { validateCreateTask, validateUpdateTask } from "../middlewares/validateTaskMiddleware.js";
import { validateTagId } from "../middlewares/validateTagIdMiddleware.js";
import { checkTaskExists } from "../middlewares/checkTaskExists.js";

const router = express.Router();

router.get("/", taskController.getTasks);
router.get("/stats", taskController.getTaskStats);
router.get("/:id/comments", checkTaskExists, commentController.getCommentsByTaskId);
router.post("/", validateCreateTask, taskController.createTask);
router.post("/:id/tags", checkTaskExists, validateTagId, taskController.addTagToTask);
router.post("/:id/comments", checkTaskExists, commentController.createComment);
router.put("/:id", checkTaskExists, validateUpdateTask, taskController.updateTask);
router.delete("/:id", checkTaskExists, taskController.deleteTask);

export default router;
