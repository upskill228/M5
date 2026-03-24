import { isEmpty, isValidEmail } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/validationError.js";

export const validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (isEmpty(name)) {
    throw new ValidationError("Name is required");
  }

  if (!isValidEmail(email)) {
    throw new ValidationError("Invalid email");
  }

  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { name, email, active } = req.body;

  if (name !== undefined && isEmpty(name)) {
    throw new ValidationError("Name cannot be empty");
  }

  if (email !== undefined && !isValidEmail(email)) {
    throw new ValidationError("Invalid email");
  }

  if (active !== undefined && typeof active !== "boolean") {
    throw new ValidationError("Active must be a boolean");
  }

  next();
};

/*
Este middleware de verificação de user é utilizado na userRoutes.js para verificar se o user existe antes do controller.
As operações só são realizadas se os users passsarem a validação.
Fornece feedback adequado em caso de erro.
*/ 