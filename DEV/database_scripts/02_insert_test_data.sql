-- Arquivo: 02_insert_test_data.sql

-- ATENÇÃO: 'hash_da_senha_...' são placeholders.
-- O backend real precisará gerar hashes seguros (ex: bcrypt).
-- Para teste direto no BD, você pode usar uma string simples,
-- mas lembre-se que o backend precisará corresponder a essa lógica de hash.

INSERT INTO VE_USUARIOS (EMAIL, SENHA_HASH, NOME_COMPLETO, TIPO_PERFIL)
VALUES ('novato@vivo.com.br', 'senha123', 'João Silva Novato', 'NOVO_COLABORADOR');

INSERT INTO VE_USUARIOS (EMAIL, SENHA_HASH, NOME_COMPLETO, TIPO_PERFIL)
VALUES ('buddy.legal@vivo.com.br', 'buddy@seguro', 'Maria Oliveira Buddy', 'BUDDY');

INSERT INTO VE_USUARIOS (EMAIL, SENHA_HASH, NOME_COMPLETO, TIPO_PERFIL)
VALUES ('gestor.chefe@vivo.com.br', 'gestor#forte', 'Carlos Andrade Gestor', 'GESTOR');

COMMIT;


-- Atualiza a senha do Novo Colaborador
UPDATE VE_USUARIOS
SET SENHA_HASH = '$2b$10$xYzxOiSX3V7saFq8n3t/BeFfcwz0tF2rBUKRd.QBGxw9nVUZQmORu'
WHERE EMAIL = 'novato@vivo.com.br';

-- Atualiza a senha do Buddy
UPDATE VE_USUARIOS
SET SENHA_HASH = '$2b$10$CLhwmQ6FBn0.iXKuJVhWeeQW/DGkTjiOVbvoxVJngA8.QkUpxmAOG'
WHERE EMAIL = 'buddy.legal@vivo.com.br';

-- Atualiza a senha do Gestor
UPDATE VE_USUARIOS
SET SENHA_HASH = '$2b$10$tZOSJaj2eVThu2SKztrwROtDEDwWFR4q9.eUQp5lYg5BY3F1l2eMy'
WHERE EMAIL = 'gestor.chefe@vivo.com.br';

-- Confirme as alterações
COMMIT;