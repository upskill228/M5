import * as taskService from "../services/taskService.js";

export const checkTaskExists = (req, res, next) => {
  const taskId = req.params.id;

  const task = taskService.getTaskById(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  req.task = task;

  next();
};
