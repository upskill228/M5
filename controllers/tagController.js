import * as tagService from "../services/tagService.js";
import { validateSortParam } from "../utils/queryValidators.js";

// GET ALL TAGS
export const getTags = async (req, res) => {
  const { search, sort } = req.query;
  validateSortParam(sort);

  const tags = await tagService.getAllTagsDB({ search, sort });
  res.json(tags);
};

// GET TAG BY ID
export const getTagById = async (req, res) => {
  // Middleware checkTagExists already fetched the tag and stored it in req.tag
  res.json(req.task);
};

// POST TAG
export const createTag = async (req, res) => {
  const newTag = await tagService.createTagDB(req.body);
  res.status(201).json({
    success: true,
    message: "Tag created",
    tag: newTag
  });
};

// PUT TAG
export const updateTag = async (req, res) => {
  const updatedTag = await tagService.updateTagDB(req.params.id, req.body);
  res.json({
    success: true,
    message: "Tag updated",
    tag: updatedTag
  });
};

// DELETE TAG
export const deleteTag = async (req, res) => {
  const result = await tagService.deleteTagDB(req.params.id);
  res.json(result);
};

// GET TAGS BY TASK ID
export const getTagsByTask = async (req, res) => {
  const taskId = req.params.id;
  const tags = await tagService.getTagsByTaskDB(taskId);
  res.json(tags);
};

/*
Este tagController é utilizado na tagRoutes.js para lidar com as requisições relacionadas às tags.
O try and catch não são necessários aqui porque os erros são tratados nos serviços e propagados para os middlewares de erro.
As operações de GET, POST, PUT e DELETE são realizadas utilizando os serviços correspondentes.
Fornece feedback adequado de status.
*/