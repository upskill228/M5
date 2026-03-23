Tenho estes enunciados:
Exercícios de Backend — Migração para MySQL

📌 Regras gerais:
- Todos os endpoints já existentes devem agora utilizar MySQL para armazenar e recuperar dados.
- Não usar arrays em memória. - Manter arquitetura services → controllers → routes.
- Usar async/await e tratamento de erros.
Exercícios Guiados (Em Aula)
Exercício 1 — Users: Listar todos

Endpoint: GET /users
Observação: Retornar todos os utilizadores da tabela users no MySQL.
Exercício 2 — Users: Criar novo

Endpoint: POST /users
Observação: Inserir novo utilizador na tabela users e retornar insertId.
Exercício 3 — Users: Atualizar

Endpoint: PUT /users/:id
Observação: Atualizar dados do utilizador no MySQL usando UPDATE e verificar affectedRows.
Exercício 4 — Users: Remover

Endpoint: DELETE /users/:id
Observação: Remover utilizador do MySQL e retornar mensagem apenas se affectedRows > 0.
Exercício 5 — Tasks: Listar todas

Endpoint: GET /tasks
Observação: Selecionar todas as tarefas da tabela tasks.
Exercício 6 — Tasks: Criar nova

Endpoint: POST /tasks
Observação: Inserir nova tarefa no MySQL com referência ao utilizador (user_id) e retornar insertId.
Exercício 7 — Tags: Listar

Endpoint: GET /tags
Observação: Selecionar todas as tags da tabela tags.
Exercício 8 — Tags: Criar nova

Endpoint: POST /tags
Observação: Inserir nova tag na tabela tags e retornar insertId.
Exercício 9 — Associar tag a tarefa

Endpoint: POST /tasks/:id/tags
Observação: Inserir relação na tabela task_tags(task_id, tag_id). Evitar duplicações.
Exercício 10 — Comentários: Criar e listar

Endpoints:

    POST /tasks/:id/comments — Inserir comentário na tabela comments com referência à tarefa e ao utilizador.
    GET /tasks/:id/comments — Listar todos os comentários da tarefa, ordenados por data.

Observação: Usar INSERT e SELECT adequadamente.

🎯 Objetivos destes exercícios

✔ Migrar toda a lógica que estava em memória para MySQL
✔ Praticar operações CRUD usando banco de dados
✔ Manter arquitetura controllers / services / routes
✔ Entender insertId e affectedRows
✔ Trabalhar relações 1:N (comentários → tarefas) e N:N (tags ↔ tarefas) 

Projeto 1 — API Completa com MySQL

    O objetivo deste projeto é criar uma API completa para gerenciamento de tarefas, incluindo utilizadores, tarefas, tags e comentários.
    Todos os endpoints desenvolvidos em aula devem agora ser ligados a uma base de dados MySQL.
    Usar Node.js com Express e JSON nas respostas.
    Não usar arrays em memória — todos os dados devem ser persistidos na base de dados.
    Validações e lógica de negócio devem ser feitas nos services, controllers apenas retornam JSON.
    IDs devem ser gerados automaticamente pela base de dados (AUTO_INCREMENT).

📁 Estrutura final do projeto

src/
  controllers/
    userController.js
    taskController.js        <-- também trata /tasks/:id/comments e /tasks/:id/tags
    tagController.js
  services/
    userService.js
    taskService.js
    tagService.js
    commentService.js
  routes/
    userRoutes.js
    taskRoutes.js
    tagRoutes.js
  middlewares/
    checkUserExists.js
  db.js
  app.js

Observação: Os services são responsáveis por executar queries SQL na base de dados.
📡 Endpoints da API (Todos com MySQL)
👤 Users

GET /users
POST /users
PUT /users/:id
PATCH /users/:id
DELETE /users/:id
GET /users?sort=asc|desc
GET /users?search=nome
GET /users/stats

📋 Tasks

GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id
GET /tasks?sort=asc|desc
GET /tasks?search=titulo
GET /tasks/stats
GET /users/:id/tasks

🏷️ Tags

GET /tags
POST /tags
DELETE /tags/:id
GET /tags/:id/tasks
POST /tasks/:id/tags

💬 Comments

POST /tasks/:id/comments
GET /tasks/:id/comments
PUT /tasks/:id/comments/:commentId
DELETE /tasks/:id/comments/:commentId

🎯 Objetivos do projeto

✔ Migrar API de memória para MySQL
✔ Trabalhar com queries SQL reais
✔ Usar async/await com base de dados
✔ Utilizar insertId e affectedRows
✔ Trabalhar relações 1:N (comentários → tarefas)
✔ Trabalhar relações N:N (tags ↔ tarefas)
✔ Preparar a aplicação para contexto real 

E preciso de ajuda para ver se estou a resolver bem:

app.js:
import dotenv from "dotenv";
import express from "express";
import { db } from "./db.js";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";

import logger from "./middlewares/loggerMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { checkDBConnection } from "./utils/checkDBConnection.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);

// Error handler - global (in the end, always)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Function start server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT}); // change to "running on port" for production
  });
};

// Initialization: checks DB connection before starting server
const init = async () => {
  await checkDBConnection(db);
  startServer();
};

init();

export default app;

db.js:
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dateStrings: true, // dates as strings to avoid timezone issues
        connectionLimit: 10,
        charset: "utf8mb4", // prevent accent issues
    })
    .promise();

(o ficheiro .env também está feito);

pasta utils:
checkDBConnection.js:
export const checkDBConnection = async (db) => {
  try {
    await db.query("SELECT 1");
    console.log("✅ DB OK");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};

/*
Função para verificar a conexão com a base de dados antes de iniciar o servidor;
Tenta executar uma query simples (SELECT 1) para garantir que a conexão está a funcionar;
Se a conexão falhar, mostra o erro na console.log e encerra o processo para evitar que o servidor inicie sem acesso ao banco.
Está a ser chamado no app.js durante a inicialização do servidor.
*/

dbErrorHandler.js:
import { ValidationError } from "./ValidationError.js";

export const handleDBError = (err) => {
  // UNIQUE constraint
  if (err.code === "ER_DUP_ENTRY") {
    throw new ValidationError("Entry already exists with the same unique value");
  }

  // FOREIGN KEY constraint
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    throw new ValidationError("Invalid reference in another table");
  }

  throw err;
};

/*
Função para mapear erros comuns do MySQL para mensagens de erro mais amigáveis;
Evita que erros da data base sejam expostos diretamente ao frontend.
Pode ser usada nos services para garantir que os erros sejam tratados adequadamente.
*/

inputValidators.js:
// Validates if string is empty or only spaces
export const isEmpty = (value) => {
  return !value || typeof value !== "string" || value.trim() === "";
};

// Validates field with minimum length
export const isMinLength = (value, min) => {
  return value.trim().length >= min;
};

// Validates email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/*
Funções puras (retornam true/false) e reutilizáveis de validação de inputs;
podem ser usadas em vários middlewares para garantir que os dados são válidos antes de serem processados pelos controllers.

-> O middleware é que é que é responsável por lançar ValidationError;
*/

queryValidators.js:
import { ValidationError } from "./ValidationError.js";

export const validateSortParam = (sort, allowed = ["asc", "desc"]) => {
  if (sort && !allowed.includes(sort.toLowerCase())) {
    throw new ValidationError(Sort must be one of: ${allowed.join(", ")});
  }
};

/*
Função de validação para query parameters;
Pode ser usada em vários controllers para validar parâmetros como "sort", "search". 
Lança um ValidationError se o parâmetro for inválido, que será tratado pelo middleware de erro global errorHandler.js

-> funções que são usadas sozinhas podem lançar o erro diretamente (como esta validateSortParam) - não é utilizada em middlewares, mas sim diretamente nos controllers.
*/

ValidationError.js:
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

/*
Classe para erros de validação;
estende / herda da classe nativa Error do JavaScript.
Permite criar erros específicos de validação com uma mensagem personalizada, facilitando a identificação e tratamento desses erros no middleware errorHandler.js
*/

Já te envio os middlewares e depois as routes


*******************************************

middlewares:

asyncHandler.js:

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/* Apanha erros de funções async e envia para next() -> errorHandler.js */

checkUserExists.js:

import { asyncHandler } from "./asyncHandler.js";
import { ValidationError } from "../utils/ValidationError.js";
import * as userService from "../services/userService.js";

export const checkUserExists = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await userService.getUserById(userId);

  if (!user) {
    throw new ValidationError("User not found");
  }

  req.user = user;
  next();
});

/*
Este middleware de verificação de user é utilizado na userRoutes.js para verificar se o user existe antes do controller.
As operações só são realizadas se os users passsarem a validação.
Fornece feedback adequado em caso de erro.
*/

errorHandler.js:
import { ValidationError } from "../utils/ValidationError.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err); // 👈 importante para debug

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

/* 
Fluxo completo:
route → asyncHandler → controller → (erro) → next(err) → errorHandler

Este é um error middleware global do Express que recebe erros do next(err) e evita try/catch em todo o lado;

erros controlados → 400 (ex: validação)
erros inesperados → 500 (erros do servidor e que não queremos passar para frontend)
*/

loggerMiddleware.js:
export default function logger(req, res, next) {
    console.log(${req.method} ${req.url});
    next();
}  

validateUser.js:

import { isEmpty, isValidEmail } from "../utils/inputValidators.js";
import { ValidationError } from "../utils/ValidationError.js";

export const validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (isEmpty(name)) {
    throw new ValidationError("Name is required");
  }

  if (!isValidEmail(email)) {
    throw new ValidationError("Invalid email");
  }

  next();
};

export const validateUpdateUser = (req, res, next) => {
  const { name, email, active } = req.body;

  if (name !== undefined && isEmpty(name)) {
    throw new ValidationError("Name cannot be empty");
  }

  if (email !== undefined && !isValidEmail(email)) {
    throw new ValidationError("Invalid email");
  }

  if (active !== undefined && typeof active !== "boolean") {
    throw new ValidationError("Active must be a boolean");
  }

  next();
};

/*
Este middleware de verificação de user é utilizado na userRoutes.js para verificar se o user existe antes do controller.
As operações só são realizadas se os users passsarem a validação.
Fornece feedback adequado em caso de erro.
*/ 

userRoutes:
import express from "express";
import * as userController from "../controllers/userController.js";
import { validateCreateUser, validateUpdateUser } from "../middlewares/validateUser.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(userController.getUsers));
router.get("/:id", checkUserExists, asyncHandler(userController.getUserById));
router.post("/", validateCreateUser, asyncHandler(userController.createUser));
router.put("/:id", checkUserExists, validateUpdateUser, asyncHandler(userController.updateUser));
router.delete("/:id", checkUserExists, asyncHandler(userController.deleteUser));

export default router;

/*
Define as routes para as operações relacionadas com os users.
Cada rota é associada a um controller específico e utiliza middlewares de validação / verificação de existência.
O asyncHandler é utilizado para lidar com erros de forma centralizada.
*/

Já te envio os mais problemáticos (controller e service depois)

