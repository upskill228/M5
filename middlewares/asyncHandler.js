export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/* Apanha erros de funções async e envia para next() -> errorHandler.js */