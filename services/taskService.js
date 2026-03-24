import { db } from "../db.js";
import { handleDBError } from "../utils/dbErrorHandler.js";
import { ValidationError } from "../utils/validationError.js";

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


// GET ALL TASKS
export const getAllTasksDB = async ({ search = null, sort = null } = {}) => {
  try {
    let query = "SELECT * FROM tasks";
    const params = [];

    if (search) {
      query += " WHERE LOWER(title) LIKE ?";
      params.push(`%${search.toLowerCase()}%`);
    }

    if (sort && ["asc", "desc"].includes(sort.toLowerCase())) {
      query += ` ORDER BY title ${sort.toUpperCase()}`;
    }

    const [rows] = await db.query(query, params);
    return rows;

  } catch (err) {
    throw handleDBError(err);
  }
};

// GET TASK BY ID
export const getTaskById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0] || null;
  } catch (err) {
    throw handleDBError(err);
  }
};

// GET TASK STATS
export const getTaskStatsDB = async () => {
  try {
    const [totalResult] = await db.query("SELECT COUNT(*) AS total FROM tasks");
    const [completedResult] = await db.query("SELECT COUNT(*) AS completed FROM tasks WHERE completed = true");

    const total = totalResult[0].total;
    const completed = completedResult[0].completed;
    const pending = total - completed;

    const pendingPercentage = total > 0 ? Number(((pending / total) * 100).toFixed(2)) : 0;
    const completedPercentage = total > 0 ? Number(((completed / total) * 100).toFixed(2)) : 0;

    return { total, pending, pendingPercentage, completed, completedPercentage };
  } catch (err) {
    throw handleDBError(err);
  }
};

// CREATE TASK
export const createTaskDB = async ({ title, category, completed = false, responsibleName, completionDate }) => {
  try {
    const [result] = await db.query(
      "INSERT INTO tasks (title, category, completed, responsibleName, completionDate) VALUES (?, ?, ?, ?, ?)",
      [title, category, completed, responsibleName, completionDate]
    );

    return {
      id: result.insertId,
      title,
      category,
      completed,
      responsibleName,
      completionDate
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

/* *****
updateTaskPartialDB usa spread operator { id, ...taskData }, retornando apenas os campos enviados + id.
updateTaskDB retorna todos os campos possíveis, mesmo que não tenham sido alterados. **** */

// UPDATE TASK
export const updateTaskDB = async (id, { title, category, completed, responsibleName, completionDate }) => {
  try {
    const fields = [];
    const params = [];

    if (title !== undefined) { fields.push("title = ?"); params.push(title); }
    if (category !== undefined) { fields.push("category = ?"); params.push(category); }
    if (completed !== undefined) { fields.push("completed = ?"); params.push(completed); }
    if (responsibleName !== undefined) { fields.push("responsibleName = ?"); params.push(responsibleName); }
    if (completionDate !== undefined) { fields.push("completionDate = ?"); params.push(completionDate); }

    if (fields.length === 0) {
      throw new ValidationError("No fields provided to update");
    }

    params.push(id);
    const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new ValidationError("Task not found");
    }

    return {
      id,
      title,
      category,
      completed,
      responsibleName,
      completionDate
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

// PATCH TASK
export const updateTaskPartialDB = async (id, taskData) => {
  try {
    const fields = [];
    const params = [];

    if (taskData.title !== undefined) {
      fields.push("title = ?");
      params.push(taskData.title);
    }
    if (taskData.category !== undefined) {
      fields.push("category = ?");
      params.push(taskData.category);
    }
    if (taskData.completed !== undefined) {
      fields.push("completed = ?");
      params.push(taskData.completed);
    }
    if (taskData.responsibleName !== undefined) {
      fields.push("responsibleName = ?");
      params.push(taskData.responsibleName);
    }
    if (taskData.completionDate !== undefined) {
      fields.push("completionDate = ?");
      params.push(taskData.completionDate);
    }

    if (fields.length === 0) {
      throw new ValidationError("No fields provided to update");
    }

    params.push(id);
    const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new ValidationError("Task not found");
    }

    // Return the updated fields + ID
    return { id, ...taskData }; // spread operator

  } catch (err) {
    throw handleDBError(err);
  }
};

// DELETE TASK
export const deleteTaskDB = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new ValidationError("Task not found");
    }

    return {
      success: true,
      message: "Task deleted"
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

// GET TASKS BY USER ID
export const getTasksByUserDB = async (userId) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tasks WHERE user_id = ?",
      [userId]
    );

    return rows;
  } catch (err) {
    throw handleDBError(err);
  }
};