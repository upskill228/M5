import { db } from "../db.js";
import { isEmpty, isValidEmail } from "../utils/validators.js";
import { ValidationError } from "../utils/validationError.js";

// .filter()	-> WHERE
// .sort()	-> ORDER BY
// .push()	-> INSERT
// .find()	-> SELECT WHERE

// GET ALL USERS
export const getAllUsersDB = async () => {
  const query = "SELECT * FROM users";
  const [rows] = await db.query(query);
  return rows;
};

// POST USER
export const createUserDB = async (name, email, active = true) => {
  if (isEmpty(name) || isEmpty(email)) {
    throw new ValidationError("Name and email are required");
  }

  if (!isValidEmail(email)) {
    throw new ValidationError("Email is invalid");
  }

  if (typeof active !== "boolean") {
    throw new ValidationError("Active must be boolean");
  }

  const query = `INSERT INTO users (name, email, active) VALUES (?, ?, ?)`;
  const [result] = await db.query(query, [name, email, active]);

  return { id: result.insertId, name, email, active };
};

// PUT USER
export const updateUserDB = async (id, name, email, active) => {
  if (isEmpty(name) || isEmpty(email)) {
    throw new ValidationError("Name and email are required");
  }

  if (!isValidEmail(email)) {
    throw new ValidationError("Email is invalid");
  }

  if (typeof active !== "boolean") {
    throw new ValidationError("Active must be boolean");
  }

  const query = `
    UPDATE users
    SET name = ?, email = ?, active = ?
    WHERE id = ?
  `;
  const [result] = await db.query(query, [name, email, active, id]);
  return result;
};

export const updateUserPartialDB = async (id, userData) => {
  // Fetch existing user
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  const user = rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  // Keep existing values if not provided
  const name = userData.name ?? user.name;
  const email = userData.email ?? user.email;
  const active = userData.active ?? user.active;

  // Validations
  if (!name || !email) throw new ValidationError("Name and email are required");
  if (typeof active !== "boolean") throw new ValidationError("Active must be boolean");

  // Update user on DB
  const [result] = await db.query(
    "UPDATE users SET name = ?, email = ?, active = ? WHERE id = ?",
    [name, email, active, id]
  );

  return result;
};

// DELETE USER
export const deleteUserDB = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return result;
};

