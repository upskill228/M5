import * as taskService from "../services/taskService.js";

// GET

export const getTasks = (req, res) => {
    const sort = req.query.sort;
    const search = req.query.search;
    const tasks = taskService.getAllTasks(sort, search);
    res.json(tasks);
};

// GET STATS
export const getTaskStats = (req, res) => {
  const stats = taskService.getTaskStats();
  res.json(stats);
};

// POST
export const createTask = (req, res) => {
  try {
    const newTask = taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST - Adicionar tag a uma tarefa
export const addTagToTask = (req, res) => {
  try { 
    const associacao = taskService.addTagToTask(req.params.id, req.body.tagId);
    res.status(201).json(associacao);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// PUT
export const updateTask = (req, res) => {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// DELETE
export const deleteTask = (req, res) => {
    const counts = taskService.deleteTask(req.params.id);
    res.json({ message: "Task deleted", counts });
};