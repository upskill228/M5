let tasks = [
    { id: 1, titulo: "Estudar Node.js", categoria: "trabalho", concluida: false, responsavelNome: "Daniel Moraes" , dataConclusao: undefined},
    { id: 2, titulo: "Comprar pão", categoria: "pessoal", concluida: false, responsavelNome: "Ana Silva" , dataConclusao: undefined},
    { id: 3, titulo: "Lavar o carro", categoria: "pessoal", concluida: false, responsavelNome: "Maria Santos" , dataConclusao: undefined}
];

// GET
export const getAllTasks = (sort = null, search = null) => {
  let result = [...tasks];
  
  // Aplicar filtro de pesquisa primeiro
  if (search) {
    result = result.filter(t => t.titulo.toLowerCase().includes(search.toLowerCase()));
  }
  
  // Depois aplicar ordenação
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

  if (taskData.concluida !== undefined) {
  task.concluida = taskData.concluida;
  task.dataConclusao = task.concluida ? new Date() : undefined;
}

  return task;
}

export const getTaskCounts = () => {
  const total = tasks.length;
  const pendentes = tasks.filter(t => !t.concluida).length;
  const concluidas = tasks.filter(t => t.concluida).length;
  return { total, pendentes, concluidas };
}

// DELETE
export const deleteTask = (id) => {
  tasks = tasks.filter(t => t.id != id);
  return getTaskCounts();
}

