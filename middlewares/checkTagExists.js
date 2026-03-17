import * as tagService from "../services/tagService.js";

export const checkTagExists = (req, res, next) => {
  const tagId = req.params.id;

  const tag = tagService.getTagById(tagId);

  if (!tag) {
    return res.status(404).json({ error: "Tag não encontrada" });
  }

  req.tag = tag;

  next();
};
