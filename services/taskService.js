import { db } from "../db.js";
import { handleDBError } from "../utils/dbErrorHandler.js";

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
// services/userService.js

// GET ALL TASKS
export const getAllTasksDB = async ({ search = null, sort = null } = {}) => {
  let query = "SELECT * FROM tasks";
  const params = [];

  if (search) {
    params.push(`%${search.toLowerCase()}%`);
    query += ` WHERE LOWER(title) LIKE $${params.length}`;
  }

  if (sort && ["newest", "oldest"].includes(sort.toLowerCase())) {
    const order = sort.toLowerCase() === "newest" ? "DESC" : "ASC";
    query += ` ORDER BY created_at ${order}`;
  }

  const { rows } = await db.query(query, params);
  return rows;
};

// GET TASK BY ID
export const getTaskById = async (id) => {
  const { rows } = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return rows[0];
};

// POST TASK
export const createTaskDB = async ({ title, description, user_id }) => {
  try {
    const { rows } = await db.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, user_id]
    );
    return rows[0];
  } catch (err) {
    handleDBError(err);
  }
};

// PUT TASK
export const updateTaskDB = async (id, { title, description, user_id }) => {
  try {
    const task = await getTaskById(id);
    const updated = {
      title: title ?? task.title,
      description: description ?? task.description,
      user_id: user_id ?? task.user_id,
    };

    const { rows } = await db.query(
      "UPDATE tasks SET title=$1, description=$2, user_id=$3 WHERE id=$4 RETURNING *",
      [updated.title, updated.description, updated.user_id, id]
    );
    return rows[0];
  } catch (err) {
    handleDBError(err);
  }
};

// DELETE TASK
export const deleteTaskDB = async (id) => {
  try {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  } catch (err) {
    handleDBError(err);
  }
};