import * as tagService from "../services/tagService.js";

// GET ALL TAGS
export const getTags = async (req, res) => {
  const { search, sort } = req.query;

  const tags = await tagService.getAllTagsDB({ search, sort });
  res.json(tags);
};

// GET TAG BY ID
export const getTagById = async (req, res) => {
  // Middleware checkTagExists already fetched the tag and stored it in req.tag
  res.json(req.tag);
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

/*
Este tagController é utilizado na tagRoutes.js para lidar com as requisições relacionadas às tags.
O try and catch não são necessários aqui porque os erros são tratados nos serviços e propagados para os middlewares de erro.
As operações de GET, POST, PUT e DELETE são realizadas utilizando os serviços correspondentes.
Fornece feedback adequado de status.
*/