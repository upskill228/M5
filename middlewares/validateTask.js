import { isEmpty } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/ValidationError.js";

export const validateCreateTask = (req, res, next) => {
  const { title, user_id } = req.body;

  if (isEmpty(title)) {
    throw new ValidationError("Title is required");
  }

  if (!user_id) {
    throw new ValidationError("user_id is required");
  }

  next();
};

export const validateUpdateTask = (req, res, next) => {
  const { title, description, user_id } = req.body;

  if (title !== undefined && isEmpty(title)) {
    throw new ValidationError("Title cannot be empty");
  }

  if (user_id !== undefined && typeof user_id !== "number") {
    throw new ValidationError("user_id must be a number");
  }

  next();
};

/*
Este middleware de verificação de task é utilizado na taskRoutes.js para verificar se a task existe antes do controller.
As operações só são realizadas se as tasks passsarem a validação.
Fornece feedback adequado em caso de erro.
*/ 