import { isEmpty, generateNextId } from "../utils/validators.js";
import * as taskService from "./taskService.js";
import * as userService from "./userService.js";

const comments = [
  { id: 1, taskId: 1, userId: 2, content: "This task is essential for the project", creationDate: new Date("2024-01-15") },
  { id: 2, taskId: 1, userId: 3, content: "I agree, we should start this soon", creationDate: new Date("2024-01-16") },
  { id: 3, taskId: 2, userId: 1, content: "Can someone help with this?", creationDate: new Date("2024-01-17") },
  { id: 4, taskId: 3, userId: 2, content: "This needs to be done by Friday", creationDate: new Date("2024-01-18") }
];

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
