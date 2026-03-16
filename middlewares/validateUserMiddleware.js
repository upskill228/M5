import { isEmpty, isValidEmail } from "../utils/validators.js";

export const validateCreateUser = (req, res, next) => {
  const { nome, email } = req.body;

  if (isEmpty(nome)) {
    return res.status(400).json({ error: "Nome is required" });
  }

  if (isEmpty(email) || !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  next();
};