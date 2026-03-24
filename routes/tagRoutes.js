import express from "express";
import * as tagController from "../controllers/tagController.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";
import { validateCreateTag } from "../middlewares/validateTag.js";
import { checkTagExists } from "../middlewares/checkTagExists.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(tagController.getTags));
router.get("/stats", asyncHandler(tagController.getTagStats));
router.post("/", validateCreateTag, asyncHandler(tagController.createTag));
router.delete("/:id", validateIdParam, checkTagExists, asyncHandler(tagController.deleteTag));
router.get("/:id/tasks", validateIdParam, checkTagExists, asyncHandler(tagController.getTasksByTag));

export default router;

/*
Define as routes para as operações relacionadas com as tags.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/