import { db } from "../db.js";
import { handleDBError } from "../utils/dbErrorHandler.js";

// .filter()	-> WHERE
// .sort()	-> ORDER BY
// .push()	-> INSERT
// .find()	-> SELECT WHERE
// services/userService.js

// GET ALL USERS
export const getAllUsersDB = async ({ search = null, sort = null } = {}) => {
  let query = "SELECT * FROM users";
  const params = [];

  if (search) {
    params.push(`%${search.toLowerCase()}%`);
    query += ` WHERE LOWER(name) LIKE $${params.length}`;
  }

  if (sort && ["asc", "desc"].includes(sort.toLowerCase())) {
    query += ` ORDER BY name ${sort.toUpperCase()}`;
  }

  const { rows } = await db.query(query, params);
  return rows;
};

// GET USER BY ID
export const getUserById = async (id) => {
  const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

// POST USER
export const createUserDB = async ({ name, email, active = true }) => {
  try {
    const { rows } = await db.query(
      "INSERT INTO users (name, email, active) VALUES ($1, $2, $3) RETURNING *",
      [name, email, active]
    );
    return rows[0];
  } catch (err) {
    handleDBError(err);
  }
};

// PUT USER
export const updateUserDB = async (id, { name, email, active }) => {
  try {
    const user = await getUserById(id);
    const updated = {
      name: name ?? user.name,
      email: email ?? user.email,
      active: active ?? user.active,
    };

    const { rows } = await db.query(
      "UPDATE users SET name=$1, email=$2, active=$3 WHERE id=$4 RETURNING *",
      [updated.name, updated.email, updated.active, id]
    );
    return rows[0];
  } catch (err) {
    handleDBError(err);
  }
};

// DELETE USER
export const deleteUserDB = async (id) => {
  try {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
  } catch (err) {
    handleDBError(err);
  }
};