import { ValidationError } from "../utils/ValidationError.js";

export const validateCommentIdParam = (req, res, next) => {
  const commentId = req.params.commentId;

  if (commentId === undefined || commentId === null) {
    throw new ValidationError("commentId parameter is required");
  }

  const commentIdNum = Number(commentId);

  if (!Number.isInteger(commentIdNum) || commentIdNum <= 0) {
    throw new ValidationError("commentId must be a positive integer");
  }

  req.params.commentId = commentIdNum;
  next();
};

/* Middleware que valida :commentId route parameter.
*/