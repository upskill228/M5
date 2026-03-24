import { isBlank } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/ValidationError.js";

const validateContent = (content, isRequired = true) => {
  if (isRequired && isBlank(content)) {
    throw new ValidationError("Content is required");
  }
  if (!isRequired && content !== undefined && isBlank(content)) {
    throw new ValidationError("Content cannot be empty");
  }
};

export const validateCreateComment = (req, res, next) => {
  const { content } = req.body;

  validateContent(content, true);

  next();
};

export const validateUpdateComment = (req, res, next) => {
  const { content } = req.body;

  validateContent(content, false);

  next();
};

/*
Este middleware é utilizado na taskRoutes/commens comentários para validar o input content.
As operações só são realizadas se o conteúdo passar na validação.
Fornece feedback adequado em caso de erro.
*/
