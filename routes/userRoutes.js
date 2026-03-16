import express from "express";
import * as userController from "../controllers/userController.js";
import { validateCreateUser, validateUpdateUser } from "../middlewares/validateUserMiddleware.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", validateCreateUser, userController.createUser);
router.put("/:id", validateUpdateUser, userController.updateUser);
router.patch("/:id", userController.toggleUserActive);
router.delete("/:id", userController.deleteUser);

export default router;