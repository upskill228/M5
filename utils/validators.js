// valida se a string é vazia ou só espaços
export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

// valida título com tamanho mínimo
export const isMinLength = (value, min) => {
  return value.trim().length >= min;
};

// valida email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};