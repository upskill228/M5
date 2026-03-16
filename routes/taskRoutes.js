import express from "express";
import * as taskController from "../controllers/taskController.js";
import { validateCreateTask, validateUpdateTask } from "../middlewares/validateTaskMiddleware.js";

const router = express.Router();

router.get("/", taskController.getTasks);
router.get("/stats", taskController.getTaskStats);
router.post("/", validateCreateTask, taskController.createTask);
router.put("/:id", validateUpdateTask, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;