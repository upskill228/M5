import { db } from "../db.js";
import { handleDBError } from "../utils/handleDBError.js";
import { ValidationError } from "../utils/ValidationError.js";
import { NotFoundError } from "../utils/NotFoundError.js";
import { getUserByIdDB } from "./userService.js";

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
    const completedPercentage = total > 0 ? Number(((completed / total) * 100).toFixed(2)) : 0;

    return { total, completed, completedPercentage };
  } catch (err) {
    throw handleDBError(err);
  }
};

// CREATE TASK
export const createTaskDB = async ({ title, category, completed = false, user_id, completion_date }) => {
  try {
    // Validar user_id
    if (user_id === undefined || user_id === null) {
      throw new ValidationError("user_id is required");
    }

    const userId = Number(user_id);
    if (!Number.isInteger(userId) || userId <= 0) { // Check if user_id is a positive integer (INT)
      throw new ValidationError("user_id must be a positive integer");
    }

    const user = await getUserByIdDB(userId);
    if (!user) {
      throw new ValidationError("User does not exist");
    }

    const [result] = await db.query(
      "INSERT INTO tasks (title, category, completed, user_id, completion_date) VALUES (?, ?, ?, ?, ?)",
      [title, category, completed, user_id, completion_date]
    );

    // Get the task with the created_at timestamp from the database
    const [rows] = await db.query(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId]
    );

    return rows[0];

  } catch (err) {
    throw handleDBError(err);
  }
};

// UPDATE TASK
export const updateTaskDB = async (id, { title, category, completed, user_id, completion_date }) => {
  try {
    // Validate user_id if provided
    if (user_id !== undefined && user_id !== null) {
      const userId = Number(user_id);
      if (!Number.isInteger(userId) || userId <= 0) {
        throw new ValidationError("user_id must be a positive integer");
      }

      const user = await getUserByIdDB(userId);
      if (!user) {
        throw new ValidationError("User does not exist");
      }
    }

    const fields = [];
    const params = [];

    if (title !== undefined) { fields.push("title = ?"); params.push(title); }
    if (category !== undefined) { fields.push("category = ?"); params.push(category); }
    if (completed !== undefined) { fields.push("completed = ?"); params.push(completed); }
    if (user_id !== undefined) { fields.push("user_id = ?"); params.push(user_id); }
    if (completion_date !== undefined) { fields.push("completion_date = ?"); params.push(completion_date); }

    if (fields.length === 0) {
      throw new ValidationError("No fields provided to update");
    }

    params.push(id);
    const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new NotFoundError("Task not found");
    }

    return { id, title, category, completed, user_id, completion_date };

  } catch (err) {
    throw handleDBError(err);
  }
};

// PATCH TASK
export const updateTaskPartialDB = async (id, taskData) => {
  try {
    // Validate user_id if provided
    if (taskData.user_id !== undefined && taskData.user_id !== null) {
      const userId = Number(taskData.user_id);
      if (!Number.isInteger(userId) || userId <= 0) {
        throw new ValidationError("user_id must be a positive integer");
      }

      const user = await getUserByIdDB(userId);
      if (!user) {
        throw new ValidationError("User does not exist");
      }
    }

    const fields = [];
    const params = [];

    if (taskData.title !== undefined) { fields.push("title = ?"); params.push(taskData.title); }
    if (taskData.category !== undefined) { fields.push("category = ?"); params.push(taskData.category); }
    if (taskData.completed !== undefined) { fields.push("completed = ?"); params.push(taskData.completed); }
    if (taskData.user_id !== undefined) { fields.push("user_id = ?"); params.push(taskData.user_id); }
    if (taskData.completion_date !== undefined) { fields.push("completion_date = ?"); params.push(taskData.completion_date); }

    if (fields.length === 0) {
      throw new ValidationError("No fields provided to update");
    }

    params.push(id);
    const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new NotFoundError("Task not found");
    }

    return { id, ...taskData };

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

// DELETE TASK
export const deleteTaskDB = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new NotFoundError("Task not found");
    }

    return {
      success: true,
      message: "Task deleted"
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

// GET TAGS BY TASK
export const getTagsByTaskDB = async (taskId) => {
  try {
    const [rows] = await db.query(
      "SELECT t.* FROM tags t INNER JOIN task_tags tt ON t.id = tt.tag_id WHERE tt.task_id = ?",
      [taskId]
    );
    return rows;
  } catch (err) {
    throw handleDBError(err);
  }
};

// ADD TAG TO TASK
export const addTagToTaskDB = async (taskId, tagId) => {
  try {
    const [result] = await db.query(
      "INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?)",
      [taskId, tagId]
    );

    return {
      taskId,
      tagId
    };

  } catch (err) {
    throw handleDBError(err, "Tag is already associated with this task");
  }
};

// REMOVE TAG FROM TASK
export const removeTagFromTaskDB = async (taskId, tagId) => {
  try {
    const [result] = await db.query(
      "DELETE FROM task_tags WHERE task_id = ? AND tag_id = ?",
      [taskId, tagId]
    );

    if (result.affectedRows === 0) {
      throw new ValidationError("Association not found");
    }

    return {
      success: true,
      message: "Tag removed from task",
      taskId,
      tagId
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

/* taskService tem a lógica de negócio, validações e interações com o banco de dados.
O try and catch é necessário aqui para capturar erros específicos do banco de dados e lançar erros personalizados.
As funções de serviço são chamadas pelos controllers, que lidam com as requisições HTTP e respostas.
Fornece feedback adequado de status e mensagens.
*/