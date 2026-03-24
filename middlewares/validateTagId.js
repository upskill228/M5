export const validateTagId = (req, res, next) => {
  const tagId = Number(req.body.tag_id);

  if (!Number.isInteger(tagId) || tagId <= 0) {
    throw new ValidationError("Invalid tag_id");
  }

  req.body.tag_id = tagId;

  next();
};