import { isBlank } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/ValidationError.js";

// Funções auxiliares para validação de campos individuais
const validateTitle = (title, isRequired = true) => {
  if (isRequired && isBlank(title)) {
    throw new ValidationError("Title is required");
  }
  if (!isRequired && title !== undefined && isBlank(title)) {
    throw new ValidationError("Title cannot be empty");
  }
};

const validateUserId = (user_id, isRequired = true) => {
  if (isRequired && (user_id === undefined || user_id === null)) {
    throw new ValidationError("user_id is required");
  }

  if (user_id !== undefined && user_id !== null) {
    if (!Number.isInteger(user_id) || user_id <= 0) {
      throw new ValidationError("user_id must be a positive integer");
    }
  }
};

export const validateCreateTask = (req, res, next) => {
  const { title, user_id } = req.body;

  validateTitle(title, true);
  validateUserId(user_id, true);

  next();
};

export const validateUpdateTask = (req, res, next) => {
  const { title, user_id } = req.body;

  validateTitle(title, false);
  validateUserId(user_id, false);

  next();
};

/*
Este middleware de verificação de task é utilizado na taskRoutes.js para verificar se a task existe antes do controller.
As operações só são realizadas se as tasks passsarem a validação.
Fornece feedback adequado em caso de erro.
*/ 