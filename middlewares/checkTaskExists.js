import * as taskService from "../services/taskService.js";

export const checkTaskExists = (req, res, next) => {
  // Retorna o taskId dos parâmetros do endpoint
  const taskId = req.params.id;

  // Find a tarefa no array de tasks
  const task = taskService.getTaskById(taskId);

  // Se não encontrar, retorna erro 404
  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  // Armazena a tarefa em req.task
  req.task = task;

  // Continua para o próximo middleware/controller
  next();
};
