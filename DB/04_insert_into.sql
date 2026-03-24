INSERT INTO users (name, email, active) VALUES
('Ana Silva', 'ana@email.com', TRUE),
('João Costa', 'joao@email.com', TRUE),
('Maria Santos', 'maria@email.com', FALSE),
('Daniel Moraes', 'daniel@email.com', TRUE);

INSERT INTO tasks (title, category, completed, user_id, completion_date) VALUES
('Study Node.js', 'work', FALSE, 4, NULL),
('Buy bread', 'personal', FALSE, 1, NULL),
('Wash the car', 'personal', FALSE, 3, NULL);

INSERT INTO comments (task_id, user_id, content, created_at) VALUES
(1, 2, 'This task is essential for the project', '2024-01-15'),
(1, 3, 'I agree, we should start this soon', '2024-01-16'),
(2, 1, 'Can someone help with this?', '2024-01-17'),
(3, 2, 'This needs to be done by Friday', '2024-01-18');

INSERT INTO tags (id, name) VALUES
(1, 'Urgent'),
(2, 'Bug'),
(3, 'Enhancement');

INSERT INTO task_tags (task_id, tag_id) VALUES
(1, 1),
(1, 3),
(2, 1);