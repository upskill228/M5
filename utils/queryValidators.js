import { ValidationError } from "./validationError.js";

export const validateSortParam = (sort, allowed = ["asc", "desc"]) => {
  if (sort && !allowed.includes(sort.toLowerCase())) {
    throw new ValidationError(`Sort must be one of: ${allowed.join(", ")}`);
  }
};

/*
Função de validação para query parameters;
Pode ser usada em vários controllers para validar parâmetros como "sort", "search". 
Lança um ValidationError se o parâmetro for inválido, que será tratado pelo middleware de erro global errorHandler.js

-> funções que são usadas sozinhas podem lançar o erro diretamente (como esta validateSortParam) - não é utilizada em middlewares, mas sim diretamente nos controllers.
*/