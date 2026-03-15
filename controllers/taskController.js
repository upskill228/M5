import * as taskService from "../services/taskService.js";

export const getTasks = (req, res) => {
    const tasks = taskService.getAllTasks();
    res.json(tasks);
};


export const createTask = (req, res) => {
  try {
    const newTask = taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTask = (req, res) => {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteTask = (req, res) => {
    taskService.deleteTask(req.params.id);
    res.json({ message: "Task deleted" });
};