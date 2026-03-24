import * as tagService from "../services/tagService.js";
import { validateSortParam } from "../utils/queryValidators.js";

// GET ALL TAGS
export const getTags = async (req, res) => {
  const { search, sort } = req.query;
  validateSortParam(sort);

  const tags = await tagService.getAllTagsDB({ search, sort });
  res.json(tags);
};

// GET TAG STATS
export const getTagStats = async (req, res) => {
  const stats = await tagService.getTagStatsDB();
  res.json(stats);
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

// DELETE TAG
export const deleteTag = async (req, res) => {
  const result = await tagService.deleteTagDB(req.params.id);
  res.json(result);
};

// GET TASKS BY TAG ID
export const getTasksByTag = async (req, res) => {
  const tagId = req.params.id;
  const tasks = await tagService.getTasksByTagDB(tagId);
  res.json(tasks);
};

/*
Este tagController é utilizado na tagRoutes.js para lidar com as requisições relacionadas às tags.
O try and catch não são necessários aqui porque os erros são tratados nos serviços e propagados para os middlewares de erro.
As operações de GET, POST, PUT e DELETE são realizadas utilizando os serviços correspondentes.
Fornece feedback adequado de status.
*/