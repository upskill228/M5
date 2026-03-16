export const validateCreateTask = (req, res, next) => {
  const { titulo, responsavelNome } = req.body;

  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  if (titulo.length < 3) {
    return res.status(400).json({ error: "Title must be at least 3 characters" });
  }

  if (!responsavelNome || responsavelNome.trim() === "") {
    return res.status(400).json({ error: "responsavelNome is required" });
  }

  next();
};

export const validateUpdateTask = (req, res, next) => {
  const { titulo, responsavelNome, concluida } = req.body;

  if (titulo !== undefined) {
    if (titulo.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    if (titulo.length < 3) {
      return res.status(400).json({ error: "Title must be at least 3 characters" });
    }
  }

  if (responsavelNome !== undefined && responsavelNome.trim() === "") {
    return res.status(400).json({ error: "responsavelNome cannot be empty" });
  }

  if (concluida !== undefined && typeof concluida !== "boolean") {
    return res.status(400).json({ error: "Concluida must be a boolean" });
  }

  next();
};
