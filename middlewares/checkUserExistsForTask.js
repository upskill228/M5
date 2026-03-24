import { asyncHandler } from "./asyncHandler.js";
import * as userService from "../services/userService.js";
import { ValidationError } from "../utils/ValidationError.js";

/*
 Check if user exists for task middleware
 If exists, goes to next middleware/Controller
 If not, throws ValidationError
 */

export const checkUserExistsForTask = asyncHandler(async (req, res, next) => {
  const { user_id } = req.body;

  // If user doesn't exist in the body, doesn't block (PUT/PATCH can update other fields)
  if (user_id === undefined) {
    return next();
  }

  const user = await userService.getUserById(user_id);

  if (!user) {
    throw new ValidationError(`User with id ${user_id} not found`);
  }

  req.userForTask = user;
  next();
});