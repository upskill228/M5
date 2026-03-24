import { db } from "../db.js";
import { handleDBError } from "../utils/handleDBError.js";
import { ValidationError } from "../utils/ValidationError.js";

// .filter()	-> WHERE
// .sort()	-> ORDER BY
// .push()	-> INSERT
// .find()	-> SELECT WHERE

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
    throw handleDBError(err);
  }
};

// GET USER BY ID
export const getUserById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  } catch (err) {
    throw handleDBError(err);
  }
};

// GET USER STATS
export const getUserStatsDB = async () => {
  try {
    const [totalResult] = await db.query("SELECT COUNT(*) AS total FROM users");
    const [activeResult] = await db.query("SELECT COUNT(*) AS active FROM users WHERE active = true");

    const total = totalResult[0].total;
    const active = activeResult[0].active;
    const activePercentage = total > 0 ? Number(((active / total) * 100).toFixed(2)) : 0;

    return { total, active, activePercentage };
  } catch (err) {
    throw handleDBError(err);
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
    throw handleDBError(err);
  }
};

/* *****
updateUserPartialDB usa spread operator { id, ...userData }, retornando apenas os campos enviados + id.
updateUserDB retorna todos os campos possíveis, mesmo que não tenham sido alterados. **** */

// UPDATE USER
export const updateUserDB = async (id, { name, email, active }) => {
  try {
    const fields = [];
    const params = [];

    if (name !== undefined) { fields.push("name = ?"); params.push(name); }
    if (email !== undefined) { fields.push("email = ?"); params.push(email); }
    if (active !== undefined) { fields.push("active = ?"); params.push(active); }

    if (fields.length === 0) {
      throw new ValidationError("No fields provided to update");
    }

    params.push(id);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new ValidationError("User not found");
    }

    return {
      id,
      name,
      email,
      active
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

// PATCH USER
export const patchUserDB = async (id, userData) => {
  try {
    const fields = [];
    const params = [];

    if (userData.name !== undefined) {
      fields.push("name = ?");
      params.push(userData.name);
    }
    if (userData.email !== undefined) {
      fields.push("email = ?");
      params.push(userData.email);
    }
    if (userData.active !== undefined) {
      if (typeof userData.active !== "boolean") {
        throw new ValidationError("Active must be a boolean");
      }
      fields.push("active = ?");
      params.push(userData.active);
    }

    if (fields.length === 0) {
      throw new ValidationError("No fields provided to update");
    }

    params.push(id);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      throw new ValidationError("User not found");
    }

    // Return the updated fields + ID
    return { id, ...userData }; // spread operator

  } catch (err) {
    throw handleDBError(err);
  }
};

// DELETE USER
export const deleteUserDB = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new ValidationError("User not found");
    }

    return {
      success: true,
      message: "User deleted"
    };

  } catch (err) {
    throw handleDBError(err);
  }
};