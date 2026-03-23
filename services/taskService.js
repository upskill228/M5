import { db } from "../db.js";
import { handleDBError } from "../utils/dbErrorHandler.js";

// let tasks = [
//     { id: 1, title: "Study Node.js", category: "work", completed: false, responsibleName: "Daniel Moraes", completionDate: undefined},
//     { id: 2, title: "Buy bread", category: "personal", completed: false, responsibleName: "Ana Silva", completionDate: undefined},
//     { id: 3, title: "Wash the car", category: "personal", completed: false, responsibleName: "Maria Santos", completionDate: undefined}
// ];

// let taskTags = [
//   { taskId: 1, tagId: 1 },  // Study Node.js → Urgent
//   { taskId: 1, tagId: 3 },  // Study Node.js → Enhancement
//   { taskId: 2, tagId: 1 },  // Buy bread → Urgent
// ];

// .filter()	-> WHERE
// .sort()	-> ORDER BY
// .push()	-> INSERT
// .find()	-> SELECT WHERE
// services/userService.js

import { db } from "../db.js";
import { handleDBError } from "../utils/dbErrorHandler.js";

// GET ALL TASKS
export const getAllTasksDB = async ({ search = null, sort = null } = {}) => {
  try {
    let query = "SELECT * FROM tasks";
    const params = [];

    if (search) {
      query += " WHERE LOWER(title) LIKE ?";
      params.push(`%${search.toLowerCase()}%`);
    }

    if (sort && ["newest", "oldest"].includes(sort.toLowerCase())) {
      const order = sort.toLowerCase() === "newest" ? "DESC" : "ASC";
      query += ` ORDER BY created_at ${order}`;
    }

    const [rows] = await db.query(query, params);
    return rows;

  } catch (err) {
    handleDBError(err);
  }
};

// GET TASK BY ID
export const getTaskById = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );
    return rows[0];
  } catch (err) {
    handleDBError(err);
  }
};

// CREATE TASK
export const createTaskDB = async ({ title, description, user_id }) => {
  try {
    const [result] = await db.query(
      "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, user_id]
    );

    return {
      id: result.insertId,
      title,
      description,
      user_id
    };

  } catch (err) {
    handleDBError(err);
  }
};

// UPDATE TASK
export const updateTaskDB = async (id, { title, description, user_id }) => {
  try {
    const [result] = await db.query(
      "UPDATE tasks SET title = ?, description = ?, user_id = ? WHERE id = ?",
      [title, description, user_id, id]
    );

    if (result.affectedRows === 0) return null;

    return { id, title, description, user_id };

  } catch (err) {
    handleDBError(err);
  }
};

// DELETE TASK
export const deleteTaskDB = async (id) => {
  try {
    const [result] = await db.query(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;

  } catch (err) {
    handleDBError(err);
  }
};