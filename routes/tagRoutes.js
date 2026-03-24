import express from "express";
import * as tagController from "../controllers/tagController.js";
import * as taskController from "../controllers/taskController.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { validateCreateTag } from "../middlewares/validateTag.js";
import { checkTagExists } from "../middlewares/checkTagExists.js";
import { checkTaskExists } from "../middlewares/checkTaskExists.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(tagController.getTags));
// router.get("/:id", validateIdParam,checkTagExists, asyncHandler(tagController.getTagById));
router.get("/stats", asyncHandler(tagController.getTagStats));
router.post("/", validateCreateTag, asyncHandler(tagController.createTag));
router.put("/:id", validateIdParam, checkTagExists, asyncHandler(tagController.updateTag));
router.delete("/:id", validateIdParam, checkTagExists, asyncHandler(tagController.deleteTag));

router.get("/tasks/:id/tags", validateIdParam, checkTaskExists, asyncHandler(taskController.getTagsByTask)); // ALL the tags of a specific task -> it's not a especific  tag so we don't use CheckTagExists, but checkTaskExists )
export default router;

/*
Define as routes para as operações relacionadas com as tags.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/