// Validates if string is empty or only spaces
export const isEmpty = (value) => {
  return !value || typeof value !== "string" || value.trim() === "";
};

export const isBlank = (value) => {
  return typeof value === "string" && value.trim() === "";
};

// Validates field with minimum length
export const isMinLength = (value, min) => {
  return value.trim().length >= min;
};

// Se value for undefined:
// export const isMinLength = (value, min) => {
//   return typeof value === "string" && value.trim().length >= min;
// };

// Validates email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/*
Funções puras (retornam true/false) e reutilizáveis de validação de inputs;
podem ser usadas em vários middlewares para garantir que os dados são válidos antes de serem processados pelos controllers.

-> O middleware é que é que é responsável por lançar ValidationError;
*/

// ============================
// VALIDATORS REUTILIZÁVEIS
// ============================

// Checa se uma string é apenas espaços em branco
export const isBlank = (value) => {
  return typeof value === "string" && value.trim() === "";
};

// Checa se uma string tem pelo menos `min` caracteres, ignorando espaços nas extremidades
export const hasMinLength = (value, min) => {
  return typeof value === "string" && value.trim().length >= min;
};

// Valida email
export const isValidEmail = (email) => {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Valida booleanos (útil para campos como active/completed)
export const isBoolean = (value) => {
  return typeof value === "boolean";
};

// Valida data no formato ISO ou Date object
export const isValidDate = (value) => {
  if (value instanceof Date && !isNaN(value)) return true;
  if (typeof value === "string") return !isNaN(Date.parse(value));
  return false;
};

// Valida arrays (útil para tags, ids, etc.)
export const isNonEmptyArray = (value) => {
  return Array.isArray(value) && value.length > 0;
};

// ============================
// USO EM MIDDLEWARE
// ============================
// Exemplo de uso em um middleware antes do controller:

/*
if (isBlank(name)) {
  throw new ValidationError("O nome não pode estar em branco");
}

if (!hasMinLength(name, 3)) {
  throw new ValidationError("O nome deve ter pelo menos 3 caracteres");
}

if (!isValidEmail(email)) {
  throw new ValidationError("Email inválido");
}
*/
