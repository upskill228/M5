import { isEmpty, generateNextId } from "../utils/inputValidators.js";
import * as taskService from "./taskService.js";
import * as userService from "./userService.js";

// POST COMMENT
export const createComment = (taskId, commentData) => {
  const task = taskService.getTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  
  const user = userService.getUserById(commentData.userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (isEmpty(commentData.content)) {
    throw new Error("Content is required");
  }

  let nextId = generateNextId(comments);

    const newComment = {    
      id: nextId,
      taskId: taskId,
      userId: commentData.userId,
      content: commentData.content,
      creationDate: new Date()
    };
    comments.push(newComment);
    return newComment;
}

// GET COMMENTS BY TASK ID
export const getCommentsByTaskId = (taskId) => {
  const taskComments = comments.filter(c => c.taskId == taskId);
  return taskComments.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
};

// REMOVE COMMENTS BY TASK ID
export const removeCommentsByTaskId = (taskId) => {
  const removedCount = comments.filter(c => c.taskId == taskId).length;
  comments = comments.filter(c => c.taskId !== taskId);
  return removedCount;
};
