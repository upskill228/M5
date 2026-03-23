import { ValidationError } from "./ValidationError.js";

export const handleDBError = (err) => {
  // UNIQUE constraint violation
  if (err.code === "23505") {
    const field = err.detail?.match(/\((.*?)\)/)?.[1] || "field";
    throw new ValidationError(`${field} já existe`);
  }

  // FOREIGN KEY violation
  if (err.code === "23503") {
    throw new ValidationError("Referência inválida em outra tabela");
  }

  //Other DB errors continue to errorHandler (500)
  throw err;
};