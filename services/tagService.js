import { isEmpty, generateNextId } from "../utils/validators.js";
import * as taskService from "./taskService.js";

let tags = [
   { id: 1, nome: "Urgente" },
   { id: 2, nome: "Bug" },
   { id: 3, nome: "Melhoria" },
];

// GET
export const getAllTags = () => {
  return [...tags];
}

// GET BY ID
export const getTagById = (id) => {
  return tags.find(t => t.id == id);
}

// POST
export const createTag = (tagData) => {
    if (isEmpty(tagData.nome)) {
        throw new Error("Nome is required");
    }
    let nextId = generateNextId(tags);
    const newTag = {
        id: nextId,
        nome: tagData.nome,
    };
    tags.push(newTag);
    return newTag;
}

// DELETE
export const deleteTag = (id) => {
  const tagToDelete = tags.find(u => u.id === id);
  if (!tagToDelete) {
    throw new Error("Tag not found");
  }
  tags = tags.filter(u => u.id !== id);
  // Remover associações no array taskTags
  taskService.removeTagAssociations(id);
  return tagToDelete;
}