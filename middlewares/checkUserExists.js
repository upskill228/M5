import * as userService from "../services/userService.js";

export const checkUserExists = (req, res, next) => {
  const userId = req.params.id;

  const user = userService.getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  req.user = user;

  next();
};
