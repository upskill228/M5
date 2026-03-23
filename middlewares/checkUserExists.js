import { asyncHandler } from "./asyncHandler.js";
import { ValidationError } from "./utils/validationError.js";
import * as userService from "../services/userService.js";

export const checkUserExists = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await userService.getUserById(userId);

  if (!user) {
    throw new ValidationError("User not found");
  }

  req.user = user;
  next();
});