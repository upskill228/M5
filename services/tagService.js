
import { db } from "../db.js";
import { handleDBError } from "../utils/handleDBError.js";
import { ValidationError } from "../utils/ValidationError.js";

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
    handleDBError(err);
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
    handleDBError(err);
  }
};

// CREATE TAG
export const createTagDB = async ({ name }) => {
  try {
    if (!name) {
      throw new ValidationError("Name is required");
    }

    const [result] = await db.query(
      "INSERT INTO tags (name) VALUES (?)",
      [name]
    );

    return {
      id: result.insertId,
      name
    };

  } catch (err) {
    handleDBError(err);
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
      throw new ValidationError("Tag not found");
    }

    return {
      success: true,
      message: "Tag deleted"
    };

  } catch (err) {
    handleDBError(err);
  }
};
