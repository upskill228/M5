import { db } from "../db.js";
import { handleDBError } from "../utils/handleDBError.js";
import { ValidationError } from "../utils/ValidationError.js";

// CREATE COMMENT
export const createCommentDB = async ({ task_id, user_id, content }) => {
  try {
    const [result] = await db.query(
      "INSERT INTO comments (task_id, user_id, content) VALUES (?, ?, ?)",
      [task_id, user_id, content]
    );

    return {
      id: result.insertId,
      task_id,
      user_id,
      content,
      created_at: new Date()
    };

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

// UPDATE COMMENT
export const updateCommentDB = async (id, { content }) => {
  try {
    if (!content) {
      throw new ValidationError("Content is required");
    }

    const [result] = await db.query(
      "UPDATE comments SET content = ? WHERE id = ?",
      [content, id]
    );

    if (result.affectedRows === 0) {
      throw new ValidationError("Comment not found");
    }

    return {
      id,
      content
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
      throw new ValidationError("Comment not found");
    }

    return {
      success: true,
      message: "Comment deleted"
    };

  } catch (err) {
    throw handleDBError(err);
  }
};
