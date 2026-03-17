import { isEmpty } from "../utils/validators.js";

export const validateTagId = (req, res, next) => {
  const { tagId } = req.body;

  if (isEmpty(tagId)) {
    return res.status(400).json({ error: "tagId is required" });
  }

  if (typeof tagId !== "number" || tagId <= 0) {
    return res.status(400).json({ error: "tagId must be a positive number" });
  }

  next();
};
