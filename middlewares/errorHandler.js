import { ValidationError } from "../utils/validationError.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err); // 👈 importante para debug

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

/* 
Fluxo completo:
route → asyncHandler → controller → (erro) → next(err) → errorHandler

Este é um error middleware global do Express que recebe erros do next(err) e evita try/catch em todo o lado;

erros controlados → 400 (ex: validação)
erros inesperados → 500 (erros do servidor e que não queremos passar para frontend)
*/