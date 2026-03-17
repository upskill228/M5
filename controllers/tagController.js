import * as tagService from "../services/tagService.js";

export const getTags = (req, res) => {
    const tags = tagService.getAlltags();
    res.json(tags);
};

// GET STATS

export const getTagStats = (req, res) => {
  const stats = tagService.getTagStats();
  res.json(stats);
};

export const createTag = (req, res) => {
  try {
    const newtag = tagService.createTag(req.body);
    res.status(201).json(newtag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTag = (req, res) => {
  try {
    const tag = tagService.updateTag(req.params.id, req.body);
    res.json(tag);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteTag = (req, res) => {
    const counts = tagService.deleteTag(req.params.id);
    res.json({ message: "Tag deleted", counts });
};