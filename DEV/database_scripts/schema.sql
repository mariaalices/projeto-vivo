CREATE TABLE avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Identificador único para cada avaliação
    usuario_id INTEGER NOT NULL,          -- ID do usuário que fez a avaliação
    humor INTEGER NOT NULL,               -- A nota do humor (1 a 5)
    comentario TEXT,                      -- O texto opcional do usuário
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data e hora que a avaliação foi salva
);


INSERT INTO avaliacoes (usuario_id, humor, comentario) VALUES (1, 5, 'Comecei o onboarding, estou animado!');