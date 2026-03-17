import { isEmpty } from "../utils/validators.js";

export const validateCreateTag = (req, res, next) => {
  const { nome } = req.body;

  if (isEmpty(nome)) {
    return res.status(400).json({ error: "Nome is required" });
  }

  next();
};
