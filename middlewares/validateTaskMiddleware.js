import { isEmpty, isMinLength } from "../utils/validators.js";

export const validateCreateTask = (req, res, next) => {
  const { titulo, responsavelNome } = req.body;

  if (isEmpty(titulo)) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!isMinLength(titulo, 3)) {
    return res.status(400).json({ error: "Title must be at least 3 characters" });
  }

  if (isEmpty(responsavelNome)) {
    return res.status(400).json({ error: "responsavelNome is required" });
  }

  next();
};