import express from "express";
import * as tagController from "../controllers/tagController.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { validateCreateTask, validateUpdateTask } from "../middlewares/validateTag,js";
import { checkTagExists } from "../middlewares/checkTagExists.js";
import { checkTaskExists } from "../middlewares/checkUserExists.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(tagController.getTags));
// router.get("/:id", validateIdParam,checkTagExists, asyncHandler(tagController.getTagById));
router.get("/stats", asyncHandler(tagController.getTagStats));
router.post("/", validateCreateTask, asyncHandler(tagController.createTag));
router.put("/:id", validateIdParam, checkTagExists, validateUpdateTask, asyncHandler(tagController.updateTag));
router.delete("/:id", validateIdParam, checkTagExists, asyncHandler(tagController.deleteTag));

router.get("/tasks/:id", validateIdParam, checkTaskExists, asyncHandler(taskController.getTasksByUser)); // ALL the tasks of a specific user -> it's not a especific  task so we don't use CheckTaskExists, but checkUserExists )
export default router;

/*
Define as routes para as operações relacionadas com as tags.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/