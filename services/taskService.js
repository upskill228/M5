// CREATE TASK
export const createTaskDB = async ({ title, category, completed = false, user_id, completion_date }) => {
  try {
    const [result] = await db.query(
      "INSERT INTO tasks (title, category, completed, user_id, completion_date) VALUES (?, ?, ?, ?, ?)",
      [title, category, completed, user_id, completion_date]
    );

    return {
      id: result.insertId,
      title,
      category,
      completed,
      user_id,
      completion_date
    };

  } catch (err) {
    throw handleDBError(err);
  }
};

// UPDATE TASK
export const updateTaskDB = async (id, { title, category, completed, user_id, completion_date }) => {
  try {
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
      throw new ValidationError("Task not found");
    }

    return { id, title, category, completed, user_id, completion_date };

  } catch (err) {
    throw handleDBError(err);
  }
};

// PATCH TASK
export const updateTaskPartialDB = async (id, taskData) => {
  try {
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
      throw new ValidationError("Task not found");
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