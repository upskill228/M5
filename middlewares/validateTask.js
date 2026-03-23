import { isEmpty, isValidEmail } from "./utils/inputValidators.js";
import { ValidationError } from "./utils/ValidationError.js";

export const validateCreateTask = (req, res, next) => {
  const { title, responsibleName } = req.body;

  if (isEmpty(title)) {
    throw new ValidationError("Title is required");
  }

  if (isEmpty(responsibleName)) {
    throw new ValidationError("Responsible name is required");
  }

  next();
};

export const validateUpdateTask = (req, res, next) => {
  const { title, responsibleName, completed } = req.body;

  if (title !== undefined && isEmpty(title)) {
    throw new ValidationError("Title cannot be empty");
  }

  if (responsibleName !== undefined && isEmpty(responsibleName)) {
    throw new ValidationError("Responsible name cannot be empty");
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    throw new ValidationError("Completed must be a boolean");
  }

  next();
};