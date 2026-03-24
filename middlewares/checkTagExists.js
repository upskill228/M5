import { asyncHandler } from "./asyncHandler.js";
import { NotFoundError } from "../utils/NotFoundError.js";
import * as tagService from "../services/tagService.js";

export const checkTagExists = asyncHandler(async (req, res, next) => {
  const tagId = req.params.id;

  const tag = await tagService.getTagById(tagId);

  if (!tag) {
    throw new NotFoundError("Tag not found");
  }
  
  req.tag = tag;

  next();
});

/*
Este middleware de verificação de tag é utilizado na tagRoutes.js para verificar se o tag existe antes do controller.
As operações só são realizadas se as tags passarem a validação.
Fornece feedback adequado em caso de erro.

-> Um middleware é assíncrono sempre que usa async/await, se chama funções que retornam Promises (await db.query(...);
Nestes casos é necessário usar o asyncHandler para lidar com erros de forma centralizada.
*/