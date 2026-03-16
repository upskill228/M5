export const validateCreateUser = (req, res, next) => {
  const { nome, email } = req.body;

  if (!nome || nome.trim() === "") {
    return res.status(400).json({ error: "Nome is required" });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { nome, email, ativo } = req.body;

  if (nome !== undefined && nome.trim() === "") {
    return res.status(400).json({ error: "Nome cannot be empty" });
  }

  if (email !== undefined && !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (ativo !== undefined && typeof ativo !== "boolean") {
    return res.status(400).json({ error: "Ativo must be a boolean" });
  }

  next();
};