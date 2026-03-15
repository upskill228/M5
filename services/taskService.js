let tasks = [
    { id: 1, titulo: "Estudar Node.js", categoria: "trabalho", concluida: false, responsavelNome: "Daniel Moraes" , dataConclusao: undefined},
    { id: 2, titulo: "Comprar pão", categoria: "pessoal", concluida: false, responsavelNome: "Ana Silva" , dataConclusao: undefined},
    { id: 3, titulo: "Lavar o carro", categoria: "pessoal", concluida: false, responsavelNome: "Maria Santos" , dataConclusao: undefined}
];

// GET
export const getAllTasks = () => {
  return tasks;
}

// POST
export const createTask = (taskData) => {

  if (!taskData.titulo) {
    throw new Error("Title is required");
  }
  
  if (taskData.titulo.length < 3) {
    throw new Error("Title must be at least 3 characters");
  }

  if (!taskData.responsavelNome) {
  throw new Error("responsavelNome is required");
}

  const newTask = {
    id: tasks.length + 1,
    titulo: taskData.titulo,
    categoria: taskData.categoria,
    concluida: false,
    responsavelNome: taskData.responsavelNome,
    dataConclusao: undefined
  };
  tasks.push(newTask);
  return newTask;
}

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

  if (taskData.dataConclusao) {
    task.dataConclusao = taskData.dataConclusao;
  } else if (taskData.dataConclusao === null) {
    task.dataConclusao = undefined;
  }

  return task;
}

// DELETE
export const deleteTask = (id) => {
  tasks = tasks.filter(t => t.id != id);
}
