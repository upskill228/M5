import { ValidationError } from "./ValidationError.js";

export const handleDBError = (err) => {
  // UNIQUE constraint
  if (err.code === "ER_DUP_ENTRY") {
    throw new ValidationError("Entry already exists with the same unique value");
  }

  // FOREIGN KEY constraint
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    throw new ValidationError("Invalid reference in another table");
  }

  throw err;
};

/*
Função para mapear erros comuns do MySQL para mensagens de erro mais amigáveis;
Evita que erros da data base sejam expostos diretamente ao frontend.
Pode ser usada nos services para garantir que os erros sejam tratados adequadamente.
*/