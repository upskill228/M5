import { ValidationError } from "../utils/ValidationError.js";

export const validateTagId = (req, res, next) => {
  const { tag_id } = req.body;

  // Validação explícita - early return para mensagens claras
  if (tag_id === undefined || tag_id === null) {
    throw new ValidationError("tag_id is required");
  }

  const tagIdNum = Number(tag_id);

  if (!Number.isInteger(tagIdNum) || tagIdNum <= 0) {
    throw new ValidationError("tag_id must be a positive integer");
  }

  req.body.tag_id = tagIdNum;

  next();
};