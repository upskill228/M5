import * as userService from "../services/userService.js";

export const checkUserExists = (req, res, next) => {
  // Retorna o userId dos parâmetros do endpoint
  const userId = req.params.id;

  // Find o utilizador no array de users
  const user = userService.getUserById(userId);

  // Se não encontrar, retorna erro 404
  if (!user) {
    return res.status(404).json({ error: "Utilizador não encontrado" });
  }

  // Armazena o utilizador em req.user
  req.user = user;

  // Continua para o próximo middleware/controller
  next();
};
