let users = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com", ativo: true },
  { id: 2, nome: "João Costa", email: "joao@email.com", ativo: true },
  { id: 3, nome: "Maria Santos", email: "maria@email.com", ativo: false }
];

// GET
export const getAllUsers = (sort = null, search = null) => {
  let result = [...users];
  
  // Aplicar filtro de pesquisa primeiro
  if (search) {
    result = result.filter(u => u.nome.toLowerCase().includes(search.toLowerCase()));
  }
  
  // Depois aplicar ordenação
  if (sort && (sort === 'asc' || sort === 'desc')) {
    result.sort((a, b) => {
      if (sort === 'asc') {
        return a.nome.localeCompare(b.nome);
      } else {
        return b.nome.localeCompare(a.nome);
      }
    });
  }
  
  return result;
}

// GET USER BY ID
export const getUserById = (id) => {
  return users.find(u => u.id == id);
}

// GET STATS
export const getUserStats = () => {
  const total = users.length;
  const ativos = users.filter(u => u.ativo).length;
  const percentagemAtivos = total > 0 ? Number((ativos / total * 100).toFixed(2)) : 0;

  return {
    total,
    ativos,
    percentagemAtivos
  };
};

// POST
export const createUser = (userData) => {
    let nextId = generateNextId(users);
  const newUser = {
    id: nextId,
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
