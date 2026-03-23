import { ValidationError } from "../utils/ValidationError.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err); // 👈 importante para debug

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};