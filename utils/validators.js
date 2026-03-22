// Validates if string is empty or only spaces
export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

// Validates field with minimum length
export const isMinLength = (value, min) => {
  return value.trim().length >= min;
};

// Validates email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ------------------- APAGAR DEPOIS
// Generates next ID based on array
export const generateNextId = (array) => {
  return array.length > 0
    ? Math.max(...array.map(item => item.id)) + 1
    : 1;
};
