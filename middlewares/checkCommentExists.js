import * as commentService from "../services/commentService.js";
import { asyncHandler } from "./asyncHandler.js";
import { NotFoundError } from "../utils/NotFoundError.js";

export const checkCommentExists = asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;

  if (!Number.isInteger(commentId || commentId === null || commentId === undefined)) {
    throw new NotFoundError("Invalid comment ID");
  }

  const comment = await commentService.getCommentByIdDB(commentId);

  if (!comment) {
    throw new NotFoundError("Comment not found");
  }

  req.comment = comment;
  next();
});
