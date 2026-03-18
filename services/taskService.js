import * as tagService from "./tagService.js";
import * as commentService from "./commentService.js";
import { generateNextId } from "../utils/validators.js";

let tasks = [
    { id: 1, title: "Study Node.js", category: "work", completed: false, responsibleName: "Daniel Moraes", completionDate: undefined},
    { id: 2, title: "Buy bread", category: "personal", completed: false, responsibleName: "Ana Silva", completionDate: undefined},
    { id: 3, title: "Wash the car", category: "personal", completed: false, responsibleName: "Maria Santos", completionDate: undefined}
];

let taskTags = [
  { taskId: 1, tagId: 1 },  // Study Node.js → Urgent
  { taskId: 1, tagId: 3 },  // Study Node.js → Enhancement
  { taskId: 2, tagId: 1 },  // Buy bread → Urgent
];

// GET TASKS
export const getAllTasks = (sort = null, search = null) => {
  let result = [...tasks];
  
  // Apply search filter
  if (search) {
    result = result.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  }
  
  // Apply sorting
  if (sort && (sort === 'asc' || sort === 'desc')) {
    result.sort((a, b) => {
      if (sort === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }
  
  return result
}

// GET STATS
export const getTaskStats = () => {
  const total = tasks.length;
  const pending = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;
  const pendingPercentage = total > 0 ? (pending / total * 100).toFixed(2) : "0.00";
  const completedPercentage = total > 0 ? (completed / total * 100).toFixed(2) : "0.00";

  return {
    total,
    pending, 
    completed,
    pendingPercentage,
    completedPercentage
  }
}

// GET TASK BY ID
export const getTaskById = (id) => {
  return tasks.find(t => t.id == id);
}

// POST TASK
export const createTask = (taskData) => {
  let nextId = generateNextId(tasks);
  const newTask = {
    id: nextId,
    title: taskData.title,
    category: taskData.category,
    completed: false,
    responsibleName: taskData.responsibleName,
    completionDate: undefined
  };
  tasks.push(newTask);
  return newTask;
}

// POST - ADD TAG TO TASK
export const addTagToTask = (taskId, tagId) => {
  const task = tasks.find(t => t.id == taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const tag = tagService.getTagById(tagId);
  if (!tag) {
    throw new Error("Tag not found");
  }

  // Check if association already exists
  const associationExists = taskTags.find(tt => tt.taskId == taskId && tt.tagId == tagId);
  if (associationExists) {
    throw new Error("This tag is already associated with this task");
  }

  const newAssociation = { taskId, tagId };
  taskTags.push(newAssociation);
  return newAssociation;
};

// PUT TASK
export const updateTask = (id, taskData) => {
  const task = tasks.find(t => t.id == id);
  if (!task) {
    throw new Error("Task not found");
  }

  task.title = taskData.title ?? task.title;
  task.category = taskData.category ?? task.category;
  task.completed = taskData.completed ?? task.completed;
  task.responsibleName = taskData.responsibleName ?? task.responsibleName;

  if (taskData.completed !== undefined) {
  task.completed = taskData.completed;
  task.completionDate = task.completed ? new Date() : undefined;
}

  return task;
}

// GET TASK COUNTS
export const getTaskCounts = () => {
  const total = tasks.length;
  const pending = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;
  return { total, pending, completed };
}

// DELETE TASK
export const deleteTask = (id) => {
  tasks = tasks.filter(t => t.id != id);
  return getTaskCounts();
}

// REMOVE TAG ASSOCIATIONS
export const removeTagAssociations = (tagId) => {
  taskTags = taskTags.filter(taskTag => taskTag.tagId !== tagId);
}

// GET TASKS BY TAG
export const getTasksByTagId = (tagId) => {
  const associations = taskTags.filter(tt => tt.tagId == tagId);
  return associations.map(association => {
    return tasks.find(t => t.id == association.taskId);
  }).filter(task => task !== undefined);
}

// GET COMMENTS BY TASK ID
export const getCommentsByTaskId = (taskId) => {
  return commentService.getCommentsByTaskId(taskId);
}

