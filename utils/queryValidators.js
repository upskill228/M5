import { ValidationError } from "../ValidationError.js";

export const validateSortParam = (sort, allowed = ["asc", "desc"]) => {
  if (sort && !allowed.includes(sort.toLowerCase())) {
    throw new ValidationError(`Sort must be one of: ${allowed.join(", ")}`);
  }
};