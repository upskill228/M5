import { isEmpty, isValidEmail } from "../utils/validators.js";

export const validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { name, email, active } = req.body;

  if (name !== undefined && isEmpty(name)) {
    return res.status(400).json({ error: "Name cannot be empty" });
  }

  if (email !== undefined && !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (active !== undefined && typeof active !== "boolean") {
    return res.status(400).json({ error: "Active must be a boolean" });
  }

  next();
};