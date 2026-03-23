CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_date DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(150) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    estado VARCHAR(50) DEFAULT 'pendente',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    responsable_name INT,
    completion_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_task INT,
    id_user INT,
    content TEXT NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- =========================
-- TABELAS N:M
-- =========================

CREATE TABLE task_tag (
    id_tarefa INT,
    id_etiqueta INT,
    PRIMARY KEY (id_tarefa, id_etiqueta)
);

CREATE TABLE tarefa_responsavel (
    id_tarefa INT,
    id_responsavel INT,
    PRIMARY KEY (id_tarefa, id_responsavel)
);
