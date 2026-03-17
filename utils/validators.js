// valida se a string é vazia ou só espaços
export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

// valida campo com tamanho mínimo
export const isMinLength = (value, min) => {
  return value.trim().length >= min;
};

// valida email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// gera o próximo ID baseado num array
export const generateNextId = (array) => {
  return array.length > 0
    ? Math.max(...array.map(item => item.id)) + 1
    : 1;
};