import { asyncHandler } from "./asyncHandler.js";
import { ValidationError } from "../utils/ValidationError.js";
import * as userService from "../services/userService.js";

export const checkUserExists = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await userService.getUserById(userId);

  if (!user) {
    throw new ValidationError("User not found");
  }

  req.user = user;
  next();
});

/*
Este middleware de verificação de user é utilizado na userRoutes.js para verificar se o user existe antes do controller.
As operações só são realizadas se os users passsarem a validação.
Fornece feedback adequado em caso de erro.

-> Um middleware é assíncrono sempre que usa async/await, se chama funções que retornam Promises (await db.query(...);
Nestes casos é necessário usar o asyncHandler para lidar com erros de forma centralizada.
*/