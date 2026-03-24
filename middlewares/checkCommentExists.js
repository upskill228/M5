import * as commentService from "../services/commentService.js";
import { asyncHandler } from "./asyncHandler.js";
import { NotFoundError } from "../utils/NotFoundError.js";

export const checkCommentExists = asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;

  if (!Number.isInteger(commentId || commentId === null || commentId === undefined)) {
    throw new NotFoundError("Invalid comment ID");
  }

  const comment = await commentService.getCommentByIdDB(commentId);

  if (!comment) {
    throw new NotFoundError("Comment not found");
  }

  req.comment = comment;
  next();
});

/* checkCommentExists é um middleware que verifica se um comentário existe antes de permitir que a rota continue.
Ele é utilizado nas rotas de comentário para garantir que as operações só sejam realizadas em comentários válidos.
Fornece feedback adequado em caso de erro, como ID inválido ou comentário não encontrado.

-> Um middleware é assíncrono sempre que usa async/await, se chama funções que retornam Promises (await db.query(...);
Nestes casos é necessário usar o asyncHandler para lidar com erros de forma centralizada.
*/
