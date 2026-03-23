import { isEmpty } from "../utils/inputValidators.js";

export const validateCreateTag = (req, res, next) => {
  const { name } = req.body;

  if (isEmpty(name)) {
    return res.status(400).json({ error: "Name is required" });
  }

  next();
};
