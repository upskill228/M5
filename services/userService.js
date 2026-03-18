let users = [
  { id: 1, name: "Ana Silva", email: "ana@email.com", active: true },
  { id: 2, name: "João Costa", email: "joao@email.com", active: true },
  { id: 3, name: "Maria Santos", email: "maria@email.com", active: false }
];

// GET USERS
export const getAllUsers = (sort = null, search = null) => {
  let result = [...users];
  
  // Apply search filter first
  if (search) {
    result = result.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  }
  
  // Then apply sorting
  if (sort && (sort === 'asc' || sort === 'desc')) {
    result.sort((a, b) => {
      if (sort === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
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
  const active = users.filter(u => u.active).length;
  const activePercentage = total > 0 ? Number((active / total * 100).toFixed(2)) : 0;

  return {
    total,
    active,
    activePercentage
  };
};

// POST USER
export const createUser = (userData) => {
    let nextId = generateNextId(users);
  const newUser = {
    id: nextId,
    name: userData.name,
    email: userData.email,
    active: true
  };
  users.push(newUser);
  return newUser;
}

// PUT USER
export const updateUser = (id, userData) => {
  const user = users.find(u => u.id == id);
  if (!user) {
    throw new Error("User not found");
  }

  user.name = userData.name ?? user.name;
  user.email = userData.email ?? user.email;
  
  // ACTIVE VALIDATION
  if (userData.active !== undefined) {
    if (typeof userData.active !== "boolean") {
      throw new Error("Active must be a boolean");
    }
    user.active = userData.active;
  }

  return user;
}

// PATCH ACTIVE/INACTIVE
export const toggleUserActive = (id) => {
  const user = users.find(u => u.id == id);
  if (!user) {
    throw new Error("User not found");
  }

  user.active = !user.active;
  return user;
}


// DELETE USER
export const deleteUser = (id) => {
  users = users.filter(u => u.id != id);
}
