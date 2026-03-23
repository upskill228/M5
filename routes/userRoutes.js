import express from "express";
import * as userController from "../controllers/userController.js";
import { validateCreateUser, validateUpdateUser } from "../middlewares/validateUser.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", checkUserExists, userController.getUserById);
router.post("/", validateCreateUser, userController.createUser);
router.put("/:id", checkUserExists, validateUpdateUser, userController.updateUser);
router.delete("/:id", checkUserExists, userController.deleteUser);

export default router;