let tasks = [
    { id: 1, titulo: "Estudar Node.js", categoria: "trabalho", concluida: false, responsavelNome: "Daniel Moraes" , dataConclusao: undefined},
    { id: 2, titulo: "Comprar pão", categoria: "pessoal", concluida: false, responsavelNome: "Ana Silva" , dataConclusao: undefined},
    { id: 3, titulo: "Lavar o carro", categoria: "pessoal", concluida: false, responsavelNome: "Maria Santos" , dataConclusao: undefined}
];

let taskTags = [];

import * as tagService from "./tagService.js";

// GET
export const getAllTasks = (sort = null, search = null) => {
  let result = [...tasks];
  
  // Aplicar filtro de pesquisa
  if (search) {
    result = result.filter(t => t.titulo.toLowerCase().includes(search.toLowerCase()));
  }
  
  // Aplicar ordenação
  if (sort && (sort === 'asc' || sort === 'desc')) {
    result.sort((a, b) => {
      if (sort === 'asc') {
        return a.titulo.localeCompare(b.titulo);
      } else {
        return b.titulo.localeCompare(a.titulo);
      }
    });
  }
  
  return result
}

// GET STATS
export const getTaskStats = () => {
  const total = tasks.length;
  const pendentes = tasks.filter(t => !t.concluida).length;
  const concluidas = tasks.filter(t => t.concluida).length;
  const percentagemPendentes = total > 0 ? (pendentes / total * 100).toFixed(2) : "0.00";
  const percentagemConcluidas = total > 0 ? (concluidas / total * 100).toFixed(2) : "0.00";

  return {
    total,
    pendentes, 
    concluidas,
    percentagemPendentes,
    percentagemConcluidas
  }
}

// GET TASK BY ID
export const getTaskById = (id) => {
  return tasks.find(t => t.id == id);
}

// POST
export const createTask = (taskData) => {
  let nextId = tasks.length > 0
    ? Math.max(...tasks.map(t => t.id)) + 1
    : 1;
  const newTask = {
    id: nextId,
    titulo: taskData.titulo,
    categoria: taskData.categoria,
    concluida: false,
    responsavelNome: taskData.responsavelNome,
    dataConclusao: undefined
  };
  tasks.push(newTask);
  return newTask;
}

// POST - TAG TO TASK
export const addTagToTask = (taskId, tagId) => {
  const task = tasks.find(t => t.id == taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const tag = tagService.getTagById(tagId);
  if (!tag) {
    throw new Error("Tag not found");
  }

  // Verificar se a associação já existe
  const associacaoExiste = taskTags.find(tt => tt.taskId == taskId && tt.tagId == tagId);
  if (associacaoExiste) {
    throw new Error("This tag is already associated with this task");
  }

  const novaAssociacao = { taskId, tagId };
  taskTags.push(novaAssociacao);
  return novaAssociacao;
};

// PUT
export const updateTask = (id, taskData) => {
  const task = tasks.find(t => t.id == id);
  if (!task) {
    throw new Error("Task not found");
  }

  task.titulo = taskData.titulo ?? task.titulo;
  task.categoria = taskData.categoria ?? task.categoria;
  task.concluida = taskData.concluida ?? task.concluida;
  task.responsavelNome = taskData.responsavelNome ?? task.responsavelNome;

  if (taskData.concluida !== undefined) {
  task.concluida = taskData.concluida;
  task.dataConclusao = task.concluida ? new Date() : undefined;
}

  return task;
}

// GET COUNTS
export const getTaskCounts = () => {
  const total = tasks.length;
  const pendentes = tasks.filter(t => !t.concluida).length;
  const concluidas = tasks.filter(t => t.concluida).length;
  return { total, pendentes, concluidas };
}

// DELETE TASK
export const deleteTask = (id) => {
  tasks = tasks.filter(t => t.id != id);
  return getTaskCounts();
}

// REMOVE TAG ASSOCIATIONS
export const removeTagAssociations = (tagId) => {
  taskTags = taskTags.filter(taskTag => taskTag.tagId !== tagId);
}

// GET TASKS BY TAG
export const getTasksByTagId = (tagId) => {
  const associations = taskTags.filter(tt => tt.tagId == tagId);
  return associations.map(association => {
    return tasks.find(t => t.id == association.taskId);
  }).filter(task => task !== undefined);
}

