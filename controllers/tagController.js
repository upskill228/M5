import * as tagService from "../services/tagService.js";
import * as taskService from "../services/taskService.js";

// GET TAGS
export const getTags = (req, res) => {
    const tags = tagService.getAllTags();
    res.json(tags);
};

// POST TAG
export const createTag = (req, res) => {
  try {
    const newtag = tagService.createTag(req.body);
    res.status(201).json(newtag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE TAG
export const deleteTag = (req, res) => {
    const tag = tagService.deleteTag(req.params.id);
    res.json(tag);
};

// GET TASKS ASSOCIATED WITH A TAG
export const getTagTasks = (req, res) => {
    const tasks = taskService.getTasksByTagId(req.params.id);
    res.json(tasks);
};