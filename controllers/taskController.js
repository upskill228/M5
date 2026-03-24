import * as taskService from "../services/taskService.js";
import * as userService from "../services/userService.js";
import * as commentService from "../services/commentService.js";
import { validateSortParam } from "../utils/queryValidators.js";
import { ValidationError } from "../utils/ValidationError.js";

// GET ALL TASKS
export const getTasks = async (req, res) => {
  const { search, sort } = req.query;
  validateSortParam(sort);

  const tasks = await taskService.getAllTasksDB({ search, sort });
  res.json(tasks);
};

// GET TASK BY ID
export const getTaskById = async (req, res) => {
  res.json(req.task); // middleware checkTaskExists já trouxe a task
};

// GET TASK STATS
export const getTaskStats = async (req, res) => {
  const stats = await taskService.getTaskStatsDB();
  res.json(stats);
};

// CREATE TASK
export const createTask = async (req, res) => {
  const { user_id } = req.body;

  // Validar user_id
  if (user_id === undefined || user_id === null) {
    throw new ValidationError("user_id is required");
  }

  const userId = Number(user_id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new ValidationError("user_id must be a positive integer");
  }

  const user = await userService.getUserByIdDB(userId);
  if (!user) {
    throw new ValidationError("User does not exist");
  }

  const newTask = await taskService.createTaskDB(req.body);
  res.status(201).json({
    success: true,
    message: "Task created",
    task: newTask
  });
};

// UPDATE TASK (PUT)
export const updateTask = async (req, res) => {
  const { user_id } = req.body;

  // Validar user_id se fornecido
  if (user_id !== undefined && user_id !== null) {
    const userId = Number(user_id);
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new ValidationError("user_id must be a positive integer");
    }

    const user = await userService.getUserByIdDB(userId);
    if (!user) {
      throw new ValidationError("User does not exist");
    }
  }

  const updatedTask = await taskService.updateTaskDB(req.params.id, req.body);
  res.json({
    success: true,
    message: "Task updated",
    task: updatedTask
  });
};

// PATCH TASK
export const patchTask = async (req, res) => {
  const { user_id } = req.body;

  // Validar user_id se fornecido
  if (user_id !== undefined && user_id !== null) {
    const userId = Number(user_id);
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new ValidationError("user_id must be a positive integer");
    }

    const user = await userService.getUserByIdDB(userId);
    if (!user) {
      throw new ValidationError("User does not exist");
    }
  }

  const updatedTask = await taskService.updateTaskPartialDB(req.params.id, req.body);
  res.json({
    success: true,
    message: "Task updated partially",
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
  const tasks = await taskService.getTasksByUserDB(req.params.id);
  res.json(tasks);
};

// COMMENTS

// POST COMMENT
export const createComment = async (req, res) => {
  const { user_id, content } = req.body;

  // Validar user_id
  if (user_id === undefined || user_id === null) {
    throw new ValidationError("user_id is required");
  }

  const userId = Number(user_id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new ValidationError("user_id must be a positive integer");
  }

  const user = await userService.getUserByIdDB(userId);
  if (!user) {
    throw new ValidationError("User does not exist");
  }

  const newComment = await commentService.createCommentDB(req.body);
  res.status(201).json({
    success: true,
    message: "Comment created",
    comment: newComment
  });
};

// GET COMMENTS BY TASK ID
export const getCommentsByTask = async (req, res) => {
  const comments = await commentService.getCommentsByTaskDB(req.params.id);
  res.json(comments);
};

// PUT COMMENT
export const updateComment = async (req, res) => {
  const { user_id } = req.body;

  // Validar user_id se fornecido
  if (user_id !== undefined && user_id !== null) {
    const userId = Number(user_id);
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new ValidationError("user_id must be a positive integer");
    }

    const user = await userService.getUserByIdDB(userId);
    if (!user) {
      throw new ValidationError("User does not exist");
    }
  }

  const updatedComment = await commentService.updateCommentDB(req.params.commentId, req.body);
  res.json({
    success: true,
    message: "Comment updated",
    comment: updatedComment
  });
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  const result = await commentService.deleteCommentDB(req.params.commentId);
  res.json(result);
};

// TAGS

// GET TAGS BY TASK ID
export const getTagsByTask = async (req, res) => {
  const taskId = req.params.id;
  const tags = await taskService.getTagsByTaskDB(taskId);
  res.json(tags);
};

// ADD TAG TO TASK
export const addTagToTask = async (req, res) => {
  const { tag_id } = req.body;
  const taskId = req.params.id;

  const result = await taskService.addTagToTaskDB(taskId, tag_id);
  res.status(201).json({
    success: true,
    message: "Tag added to task",
    taskTag: result
  });
};

// DELETE TAG FROM TASK
export const removeTagFromTask = async (req, res) => {
  const { tag_id } = req.body;
  const taskId = req.params.id;

  const result = await taskService.removeTagFromTaskDB(taskId, tag_id);
  res.json({
    success: true,
    message: "Tag removed from task",
    taskTag: result
  });
};

/*
Este taskController é utilizado na taskRoutes.js para lidar com as requisições relacionadas às tasks.
O try and catch não são necessários aqui porque os erros são tratados nos serviços e propagados para os middlewares de erro.
As operações de GET, POST, PUT e DELETE são realizadas utilizando os serviços correspondentes.
Fornece feedback adequado de status.
*/
