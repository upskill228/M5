import * as tagService from "../services/tagService.js";

export const getTags = (req, res) => {
    const tags = tagService.getAllTags();
    res.json(tags);
};

export const createTag = (req, res) => {
  try {
    const newtag = tagService.createTag(req.body);
    res.status(201).json(newtag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTag = (req, res) => {
    const tag = tagService.deleteTag(req.params.id);
    res.json(tag);
};