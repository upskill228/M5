// Validates if string is empty or only spaces
export const isBlank = (value) => {
  return typeof value === "string" && value.trim() === "";
};

// Validates field with minimum length
export const isMinLength = (value, min) => {
  if (typeof value !== "string") return false;
  return value.trim().length >= min;
};

// Validates email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Validates booleans (example active/completed)
export const isBoolean = (value) => {
  return typeof value === "boolean";
};

/*
Funções puras (retornam true/false) e reutilizáveis de validação de inputs;
podem ser usadas em vários middlewares para garantir que os dados são válidos antes de serem processados pelos controllers.

-> O middleware é que é que é responsável por lançar ValidationError;
*/