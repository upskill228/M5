import { asyncHandler } from "./asyncHandler.js";
import { ValidationError } from "./utils/ValidationError.js";
import * as tagService from "../services/tagService.js";

export const checkTagExists = asyncHandler(async (req, res, next) => {
  const tagId = req.params.id;

  const tag = await tagService.getTagById(tagId);

  if (!tag) {
    throw new ValidationError("Tag not found");
  }

  req.tag = tag;
  next();
});