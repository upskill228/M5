import { isBlank } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/ValidationError.js";

export const validateCreateTag = (req, res, next) => {
  const { name } = req.body;

  if (isBlank(name)) {
    throw new ValidationError("Tag name is required");
  }

  next();
};

/* Este middleware de verificação de tag é utilizado na tagRoutes.js para verificar se a tag existe antes do controller.
As operações só são realizadas se as tags passarem a validação.
Fornece feedback adequado em caso de erro.
*/