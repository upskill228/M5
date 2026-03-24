import { isBlank } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/ValidationError.js";

export const validateCreateTag = (req, res, next) => {
  const { name } = req.body;

  if (isBlank(name)) {
    throw new ValidationError("Tag name is required");
  }

  next();
};