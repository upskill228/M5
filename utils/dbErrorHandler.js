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