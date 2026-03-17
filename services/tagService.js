let tags = [
   { id: 1, nome: "Urgente" },
   { id: 2, nome: "Bug" },
   { id: 3, nome: "Melhoria" },
];

// GET
export const getAllTag = () => {
  let result = [...tags]
  return result
}

// POST
export const createTag = () => {
    const newTag = {
        id: tags.length + 1,
        nome: tagData.nome,
    }
    tags.push(newTag);
    return newTag;
}

// DELETE
export const deleteTag = (id) => {
  tags = tags.filter(u => u.id != id);
  return tags
}