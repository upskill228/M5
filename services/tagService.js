
import { db } from "../db.js";
import { handleDBError } from "../utils/handleDBError.js";
import { ValidationError } from "../utils/ValidationError.js";
import { NotFoundError } from "../utils/NotFoundError.js";

// GET ALL TAGS
export const getAllTagsDB = async ({ search = null, sort = null } = {}) => {
  try {
    let query = "SELECT * FROM tags";
    const params = [];

    if (search) {
      query += " WHERE LOWER(name) LIKE ?";
      params.push(`%${search.toLowerCase()}%`);
    }

    if (sort && ["asc", "desc"].includes(sort.toLowerCase())) {
      query += ` ORDER BY name ${sort.toUpperCase()}`;
    }

    const [rows] = await db.query(query, params);
    return rows;

  } catch (err) {
    throw handleDBError(err);
  }
};

// GET TAG BY ID
export const getTagByIdDB = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tags WHERE id = ?",
      [id]
    );

    return rows[0] || null;

  } catch (err) {
    throw handleDBError(err);
  }
};

// Alias for middleware compatibility
export const getTagById = getTagByIdDB;

// GET TAG STATS
export const getTagStatsDB = async () => {
  try {
    const [totalResult] = await db.query("SELECT COUNT(*) AS total FROM tags");
    const total = totalResult[0].total;

    return { total };
  } catch (err) {
    throw handleDBError(err);
  }
};

// CREATE TAG
export const createTagDB = async ({ name }) => {
  try {
    const [result] = await db.query(
      "INSERT INTO tags (name) VALUES (?)",
      [name]
    );

    return {
      id: result.insertId,
      name
    };

  } catch (err) {
    throw handleDBError(err, "Tag with this name already exists");
  }
};

// DELETE TAG
export const deleteTagDB = async (id) => {
  try {
    const [result] = await db.query(
      "DELETE FROM tags WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      throw new NotFoundError("Tag not found");
    }

    return {
      success: true,
      message: "Tag deleted"
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

// GET TASKS BY TAG ID
export const getTasksByTagDB = async (tagId) => {
  try {
    const [rows] = await db.query(
      "SELECT t.* FROM tasks t INNER JOIN task_tags tt ON t.id = tt.task_id WHERE tt.tag_id = ?",
      [tagId]
    );
    return rows;
  } catch (err) {
    throw handleDBError(err);
  }
};
