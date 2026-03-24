import { isEmpty } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/validationError.js";

export const validateCreateTag = (req, res, next) => {
  const { name } = req.body;

  if (isEmpty(name)) {
    throw new ValidationError("Tag name is required");
  }

  next();
};