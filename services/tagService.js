import { isEmpty, generateNextId } from "../utils/inputValidators.js";
import * as taskService from "./taskService.js";

// let tags = [
//    { id: 1, name: "Urgent" },
//    { id: 2, name: "Bug" },
//    { id: 3, name: "Enhancement" },
// ];

// GET TAGS
export const getAllTags = () => {
  return [...tags];
}

// GET TAG BY ID
export const getTagById = (id) => {
  return tags.find(t => t.id == id);
}

// POST TAG
export const createTag = (tagData) => {
    if (isEmpty(tagData.name)) {
        throw new Error("Name is required");
    }
    let nextId = generateNextId(tags);
    const newTag = {
        id: nextId,
        name: tagData.name,
    };
    tags.push(newTag);
    return newTag;
}

// DELETE TAG
export const deleteTag = (id) => {
  const tagToDelete = tags.find(u => u.id === id);
  if (!tagToDelete) {
    throw new Error("Tag not found");
  }
  tags = tags.filter(u => u.id !== id);
  // Remove associations in taskTags array
  taskService.removeTagAssociations(id);
  return tagToDelete;
}