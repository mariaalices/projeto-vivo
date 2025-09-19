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