import * as commentService from "../services/commentService.js";

export const createComment = (req, res) => {
  try {
    const comment = commentService.createComment(req.params.id, req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
