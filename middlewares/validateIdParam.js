import { ValidationError } from "../utils/ValidationError.js";

export const validateIdParam = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError("Invalid ID parameter");
  }
  next();
};

/*
Middleware de validação de ID em routes parameters ( req.params );
É utilizado em várias rotas (userRoutes.js, taskRoutes.js por exemplo) para garantir que o parâmetro de ID fornecido é um número inteiro positivo.
As operações só são realizadas se o ID passar a validação.
Fornece feedback adequado em caso de erro.
*/