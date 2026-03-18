import { isEmpty, isMinLength } from "../utils/validators.js";

export const validateCreateTask = (req, res, next) => {
  const { title, responsibleName } = req.body;

  if (isEmpty(title)) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!isMinLength(title, 3)) {
    return res.status(400).json({ error: "Title must be at least 3 characters" });
  }

  if (isEmpty(responsibleName)) {
    return res.status(400).json({ error: "responsibleName is required" });
  }

  next();
};

export const validateUpdateTask = (req, res, next) => {
  const { title, responsibleName, completed } = req.body;

  if (title !== undefined) {
    if (isEmpty(title)) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    if (!isMinLength(title, 3)) {
      return res.status(400).json({ error: "Title must be at least 3 characters" });
    }
  }

  if (responsibleName !== undefined && isEmpty(responsibleName)) {
    return res.status(400).json({ error: "responsibleName cannot be empty" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed must be a boolean" });
  }

  next();
};