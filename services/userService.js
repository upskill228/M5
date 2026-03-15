let users = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com", ativo: true },
  { id: 2, nome: "João Costa", email: "joao@email.com", ativo: true },
  { id: 3, nome: "Maria Santos", email: "maria@email.com", ativo: false }
];

// GET
export const getAllUsers = () => {
  return users;
}

// POST
export const createUser = (userData) => {

  if (!userData.email || !userData.email.includes("@")) {
    throw new Error("Invalid email");
  }

  const newUser = {
    id: users.length + 1,
    nome: userData.nome,
    email: userData.email,
    ativo: true
  };
  users.push(newUser);
  return newUser;
}

// PUT
export const updateUser = (id, userData) => {
  const user = users.find(u => u.id == id);
  if (!user) {
    throw new Error("User not found");
  }

  user.nome = userData.nome ?? user.nome;
  user.email = userData.email ?? user.email;
  user.ativo = userData.ativo ?? user.ativo;

  return user;
}

// PATCH ACTIVE/INACTIVE

export const toggleUserActive = (id) => {
  const user = users.find(u => u.id == id);
  if (!user) {
    throw new Error("User not found");
  }

  user.ativo = !user.ativo;
  return user;
}


// DELETE
export const deleteUser = (id) => {
  users = users.filter(u => u.id != id);
}
