import * as taskService from "../services/taskService.js";
import { validateSortParam } from "../utils/queryValidators.js";

// GET ALL TASKS
export const getTasks = async (req, res) => {
  const { search, sort } = req.query;
  validateSortParam(sort);

  const tasks = await taskService.getAllTasksDB({ search, sort });
  res.json(tasks);
};

// GET TASK BY ID
export const getTaskById = async (req, res) => {
  // Middleware checkTaskExists already fetched the task and stored it in req.task
  res.json(req.task);
};

// GET TASK STATS
export const getTaskStats = async (req, res) => {
  const stats = await taskService.getTaskStatsDB();
  res.json(stats);
};

// POST TASK
export const createTask = async (req, res) => {
  const newTask = await taskService.createTaskDB(req.body);
  res.status(201).json({
    success: true,
    message: "Task created",
    task: newTask
  });
};

// PUT TASK
export const updateTask = async (req, res) => {
  const updatedTask = await taskService.updateTaskDB(req.params.id, req.body);
  res.json({
    success: true,
    message: "Task updated",
    task: updatedTask
  });
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  const result = await taskService.deleteTaskDB(req.params.id);
  res.json(result);
};

// GET TASKS BY USER ID
export const getTasksByUser = async (req, res) => {
  const userId = req.params.id;
  const tasks = await taskService.getTasksByUserDB(userId);
  res.json(tasks);
};

/*
Este taskController é utilizado na taskRoutes.js para lidar com as requisições relacionadas às tasks.
O try and catch não são necessários aqui porque os erros são tratados nos serviços e propagados para os middlewares de erro.
As operações de GET, POST, PUT e DELETE são realizadas utilizando os serviços correspondentes.
Fornece feedback adequado de status.
*/