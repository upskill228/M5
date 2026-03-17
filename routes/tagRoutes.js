import express from "express";
import * as tagController from "../controllers/tagController.js";
import { validateCreateTag } from "../middlewares/validateTagMiddleware.js";
import { checkTagExists } from "../middlewares/checkTagExists.js";

const router = express.Router();

router.get("/", tagController.getTags);
router.get("/:id/tasks", checkTagExists, tagController.getTagTasks);
router.post("/", validateCreateTag, tagController.createTag);
router.delete("/:id", checkTagExists, tagController.deleteTag);

export default router;