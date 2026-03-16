import express from "express";
import * as userController from "../controllers/userController.js";
import { validateCreateUser, validateUpdateUser } from "../middlewares/validateUserMiddleware.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/stats", userController.getUserStats);
router.post("/", validateCreateUser, userController.createUser);
router.put("/:id", checkUserExists, validateUpdateUser, userController.updateUser);
router.patch("/:id", checkUserExists, userController.toggleUserActive);
router.delete("/:id", checkUserExists, userController.deleteUser);

export default router;