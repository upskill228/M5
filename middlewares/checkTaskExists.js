import { asyncHandler } from "./asyncHandler.js";
import { ValidationError } from "./utils/ValidationError.js";
import * as taskService from "../services/taskService.js";

export const checkTaskExists = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;

  const task = await taskService.getTaskById(taskId);

  if (!task) {
    throw new ValidationError("Task not found");
  }
  
  req.task = task;

  next();
});