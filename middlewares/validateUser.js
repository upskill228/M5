import { isBlank, isValidEmail, isBoolean } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/ValidationError.js";

// Funções auxiliares para validação de campos individuais
const validateName = (name, isRequired = true) => {
  if (isRequired && isBlank(name)) {
    throw new ValidationError("Name is required");
  }
  if (!isRequired && name !== undefined && isBlank(name)) {
    throw new ValidationError("Name cannot be empty");
  }
};

const validateEmail = (email, isRequired = true) => {
  if (isRequired && (isBlank(email) || !isValidEmail(email))) {
    throw new ValidationError("Valid email is required");
  }
  if (!isRequired && email !== undefined && (isBlank(email) || !isValidEmail(email))) {
    throw new ValidationError("Valid email is required");
  }
};

const validateActive = (active) => {
  if (active !== undefined && !isBoolean(active)) {
    throw new ValidationError("Active must be a boolean");
  }
};

export const validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;

  validateName(name, true);
  validateEmail(email, true);

  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { name, email, active } = req.body;

  validateName(name, false);
  validateEmail(email, false);
  validateActive(active);

  next();
};

/*
Este middleware de verificação de user é utilizado na userRoutes.js para verificar se o user existe antes do controller.
As operações só são realizadas se os users passsarem a validação.
Fornece feedback adequado em caso de erro.
*/ 