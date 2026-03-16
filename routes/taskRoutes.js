import express from "express";
import * as taskController from "../controllers/taskController.js";
import { validateCreateTask, validateUpdateTask } from "../middlewares/validateTaskMiddleware.js";
import { checkTaskExists } from "../middlewares/checkTaskExists.js";

const router = express.Router();

router.get("/stats", taskController.getTaskStats);
router.get("/", taskController.getTasks);
router.post("/", validateCreateTask, taskController.createTask);
router.put("/:id", checkTaskExists, validateUpdateTask, taskController.updateTask);
router.delete("/:id", checkTaskExists, taskController.deleteTask);

export default router;