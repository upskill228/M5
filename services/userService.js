import { db } from "../db.js";
import { handleDBError } from "../utils/dbErrorHandler.js";

// .filter()	-> WHERE
// .sort()	-> ORDER BY
// .push()	-> INSERT
// .find()	-> SELECT WHERE
// services/userService.js

// GET ALL USERS
export const getAllUsersDB = async ({ search = null, sort = null } = {}) => {
  try {
    let query = "SELECT * FROM users";
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

// GET USER BY ID
export const getUserById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  } catch (err) {
    handleDBError(err);
  }
};

// CREATE USER
export const createUserDB = async ({ name, email, active = true }) => {
  try {
    const [result] = await db.query(
      "INSERT INTO users (name, email, active) VALUES (?, ?, ?)",
      [name, email, active]
    );

    return {
      id: result.insertId,
      name,
      email,
      active
    };

  } catch (err) {
    handleDBError(err);
  }
};

// UPDATE USER
export const updateUserDB = async (id, { name, email, active }) => {
  try {
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?, active = ? WHERE id = ?",
      [name, email, active, id]
    );

    if (result.affectedRows === 0) return null;

    return { id, name, email, active };

  } catch (err) {
    handleDBError(err);
  }
};

// DELETE USER
export const deleteUserDB = async (id) => {
  try {
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;

  } catch (err) {
    handleDBError(err);
  }
};