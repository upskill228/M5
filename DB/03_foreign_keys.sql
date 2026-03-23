--
-- Guiados 4

ALTER TABLE tarefas
ADD CONSTRAINT fk_tarefa_utilizador
FOREIGN KEY (id_utilizador)
REFERENCES utilizadores(id)
ON DELETE SET NULL;

ALTER TABLE tarefas
ADD CONSTRAINT fk_tarefa_projeto
FOREIGN KEY (id_projeto)
REFERENCES projetos(id)
ON DELETE SET NULL;

ALTER TABLE tarefas
ADD CONSTRAINT fk_tarefas_estado
FOREIGN KEY (id_estado) REFERENCES estados(id);

ALTER TABLE comentarios
ADD CONSTRAINT fk_comentario_utilizador
FOREIGN KEY (id_utilizador)
REFERENCES utilizadores(id)
ON DELETE CASCADE;

ALTER TABLE comentarios
ADD CONSTRAINT fk_comentario_tarefa
FOREIGN KEY (id_tarefa)
REFERENCES tarefas(id)
ON DELETE CASCADE;

--
-- Autónomos 4

ALTER TABLE tarefa_etiqueta
ADD CONSTRAINT fk_tarefa_etiqueta_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id)
ON DELETE CASCADE;

ALTER TABLE tarefa_etiqueta
ADD CONSTRAINT fk_tarefa_etiqueta_etiqueta
FOREIGN KEY (id_etiqueta) REFERENCES etiquetas(id)
ON DELETE CASCADE;


ALTER TABLE tarefa_responsavel
ADD CONSTRAINT fk_tarefa_responsavel_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id)
ON DELETE CASCADE;

ALTER TABLE tarefa_responsavel
ADD CONSTRAINT fk_tarefa_responsavel_utilizador
FOREIGN KEY (id_responsavel) REFERENCES utilizadores(id)
ON DELETE CASCADE;

--
-- Guiados 8.1

ALTER TABLE notificacoes
ADD CONSTRAINT fk_notificacoes_utilizador
FOREIGN KEY (id_utilizador) REFERENCES utilizadores(id);

ALTER TABLE anexos
ADD CONSTRAINT fk_anexo_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id);

ALTER TABLE anexos
ADD CONSTRAINT fk_anexo_utilizador
FOREIGN KEY (id_utilizador) REFERENCES utilizadores(id);

--
-- Autónomos 8.1

ALTER TABLE subtarefas
ADD CONSTRAINT fk_subtarefa_tarefa
FOREIGN KEY (id_tarefa_pai) REFERENCES tarefas(id);

ALTER TABLE dependencias_tarefas
ADD CONSTRAINT fk_dependencias_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id),
ADD CONSTRAINT fk_dependencias_tarefa_dependente
FOREIGN KEY (id_tarefa_dependente) REFERENCES tarefas(id);

ALTER TABLE tarefas_favoritas
ADD CONSTRAINT fk_tarefas_favoritas_utilizador
FOREIGN KEY (id_utilizador) REFERENCES utilizadores(id),
ADD CONSTRAINT fk_tarefas_favoritas_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id);

ALTER TABLE lembretes
ADD CONSTRAINT fk_lembretes_utilizador
FOREIGN KEY (id_utilizador) REFERENCES utilizadores(id),
ADD CONSTRAINT fk_lembretes_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id);

ALTER TABLE sprints
ADD CONSTRAINT fk_sprints_projeto
FOREIGN KEY (id_projeto) REFERENCES projetos(id);

ALTER TABLE sprint_tarefas
ADD CONSTRAINT fk_sprint_tarefas_sprint
FOREIGN KEY (id_sprint) REFERENCES sprints(id),
ADD CONSTRAINT fk_sprint_tarefas_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id);

ALTER TABLE mencoes
ADD CONSTRAINT fk_mencoes_comentario
FOREIGN KEY (id_comentario) REFERENCES comentarios(id),
ADD CONSTRAINT fk_mencoes_utilizador
FOREIGN KEY (id_utilizador_mencionado) REFERENCES utilizadores(id);

--
-- Guiados 8.2

ALTER TABLE registos_tempo
ADD CONSTRAINT fk_registos_tempo_utilizador
FOREIGN KEY (id_utilizador) REFERENCES utilizadores(id),
ADD CONSTRAINT fk_registos_tempo_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id);

--
-- Entrega 1

ALTER TABLE utilizadores_equipas
ADD CONSTRAINT fk_utilizadores_equipas_utilizador
FOREIGN KEY (id_utilizador) REFERENCES utilizadores(id),
ADD CONSTRAINT fk_utilizadores_equipas_equipa
FOREIGN KEY (id_equipa) REFERENCES equipas(id);

ALTER TABLE voto
ADD CONSTRAINT fk_voto_tarefa
FOREIGN KEY (id_tarefas) REFERENCES tarefas(id),
ADD CONSTRAINT fk_voto_utilizador
FOREIGN KEY (id_utilizador) REFERENCES utilizadores(id);

ALTER TABLE historico_estado
ADD CONSTRAINT fk_historico_estado_tarefa
FOREIGN KEY (id_tarefa) REFERENCES tarefas(id);

ALTER TABLE permissoes
ADD CONSTRAINT fk_permissoes_projeto
FOREIGN KEY (id_projeto) REFERENCES projetos(id),
ADD CONSTRAINT fk_permissoes_utilizador
FOREIGN KEY (id_utilizador) REFERENCES utilizadores(id);
