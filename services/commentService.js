import { db } from "../db.js";
import { handleDBError } from "../utils/handleDBError.js";
import { ValidationError } from "../utils/ValidationError.js";
import { NotFoundError } from "../utils/NotFoundError.js";
import { getUserByIdDB } from "./userService.js";

// CREATE COMMENT
export const createCommentDB = async ({ task_id, user_id, content }) => {
  try {
    // Validate user_id
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
      "INSERT INTO comments (task_id, user_id, content) VALUES (?, ?, ?)",
      [task_id, user_id, content]
    );

    // Get the comment with the created_at timestamp from the database
    const [rows] = await db.query(
      "SELECT * FROM comments WHERE id = ?",
      [result.insertId]
    );

    return rows[0];

  } catch (err) {
    throw handleDBError(err);
  }
};

// GET COMMENTS BY TASK ID
export const getCommentsByTaskDB = async (taskId) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM comments WHERE task_id = ? ORDER BY created_at DESC",
      [taskId]
    );
    return rows;
  } catch (err) {
    throw handleDBError(err);
  }
};

// GET COMMENT BY ID
export const getCommentByIdDB = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  } catch (err) {
    throw handleDBError(err);
  }
};

// UPDATE COMMENT
export const updateCommentDB = async (id, { content, user_id }) => {
  try {
    // Validate user_id if provided
    if (user_id !== undefined && user_id !== null) {
      const userId = Number(user_id);
      if (!Number.isInteger(userId) || userId <= 0) {
        throw new ValidationError("user_id must be a positive integer"); // Check if user_id is a positive integer (INT)
      }

      const user = await getUserByIdDB(userId);
      if (!user) {
        throw new ValidationError("User does not exist");
      }
    }

    const fields = [];
    const params = [];

    if (content !== undefined) { fields.push("content = ?"); params.push(content); }
    if (user_id !== undefined) { fields.push("user_id = ?"); params.push(user_id); }

    if (fields.length === 0) {
      throw new ValidationError("No fields provided to update");
    }

    params.push(id);
    const query = `UPDATE comments SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new NotFoundError("Comment not found");
    }

    return {
      id,
      content,
      user_id
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

// DELETE COMMENT
export const deleteCommentDB = async (id) => {
  try {
    const [result] = await db.query(
      "DELETE FROM comments WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      throw new NotFoundError("Comment not found");
    }

    return {
      success: true,
      message: "Comment deleted"
    };

  } catch (err) {
    throw handleDBError(err);
  }
};
