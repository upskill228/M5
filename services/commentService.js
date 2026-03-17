import { isEmpty, generateNextId } from "../utils/validators.js";
import * as taskService from "./taskService.js";
import * as userService from "./userService.js";

const comments = [];

// POST
export const createComment = (taskId, commentData) => {
  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  
  const user = userService.getUserById(commentData.userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (isEmpty(commentData.conteudo)) {
    throw new Error("Conteudo is required");
  }

  let nextId = generateNextId(comments);

    const newComment = {    
      id: nextId,
      taskId: taskId,
      userId: commentData.userId,
      conteudo: commentData.conteudo,
      dataCriacao: new Date()
    };
    comments.push(newComment);
    return newComment;
}

// GET COMMENTS BY TASK ID
export const getCommentsByTaskId = (taskId) => {
  const taskComments = comments.filter(c => c.taskId == taskId);
  return taskComments.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
};
