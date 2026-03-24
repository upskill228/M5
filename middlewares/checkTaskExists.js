import { asyncHandler } from "./asyncHandler.js";
import { NotFoundError } from "../utils/NotFoundError.js";
import * as taskService from "../services/taskService.js";

export const checkTaskExists = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;

  const task = await taskService.getTaskById(taskId);

  if (!task) {
    throw new NotFoundError("Task not found");
  }
  
  req.task = task;

  next();
});

/*
Este middleware de verificação de task é utilizado na taskRoutes.js para verificar se o task existe antes do controller.
As operações só são realizadas se as tasks passsarem a validação.
Fornece feedback adequado em caso de erro.

-> Um middleware é assíncrono sempre que usa async/await, se chama funções que retornam Promises (await db.query(...);
Nestes casos é necessário usar o asyncHandler para lidar com erros de forma centralizada.
*/