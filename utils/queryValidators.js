import { ValidationError } from "./ValidationError.js";

export const validateSortParam = (sort, allowed = ["asc", "desc"]) => {
  // Validação defensiva: verifica tipo mesmo que query params sejam sempre strings
  // Boa prática para APIs robustas
  if (!sort) return; // Opcional é OK
  
  if (typeof sort !== "string") {
    throw new ValidationError("Sort parameter must be a string");
  }
  
  if (!allowed.includes(sort.toLowerCase())) {
    throw new ValidationError(`Sort must be one of: ${allowed.join(", ")}`);
  }
};

/*
Função de validação para query parameters;
Pode ser usada em vários controllers para validar parâmetros como "sort", "search". 
Lança um ValidationError se o parâmetro for inválido, que será tratado pelo middleware de erro global errorHandler.js

-> funções que são usadas sozinhas podem lançar o erro diretamente (como esta validateSortParam) - não é utilizada em middlewares, mas sim diretamente nos controllers.
*/