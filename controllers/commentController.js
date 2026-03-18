import * as commentService from "../services/commentService.js";

// GET COMMENTS BY TASK ID
export const getCommentsByTaskId = (req, res) => {
  try {
    const comments = commentService.getCommentsByTaskId(req.params.id);
    res.json(comments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// POST COMMENT
export const createComment = (req, res) => {
  try {
    const comment = commentService.createComment(req.params.id, req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
