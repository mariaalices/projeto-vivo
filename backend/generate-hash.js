// backend/generate-hash.js
const bcrypt = require('bcrypt');

// O número de "salt rounds" afeta o quão custoso é gerar o hash.
// Um valor comum é 10 ou 12. Deve ser o mesmo que você usaria
// ao gerar hashes de senhas reais na sua aplicação.
const saltRounds = 10;

// Função para gerar o hash
async function hashPassword(password) {
  if (!password) {
    console.error('Erro: Nenhuma senha foi fornecida para gerar o hash.');
    console.log(
      'Uso: Modifique a variável "senhaParaHashear" neste script com a senha desejada.',
    );
    return;
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    console.log(`------------------------------------------------------`);
    console.log(`Senha Original: ${password}`);
    console.log(`Hash Bcrypt Gerado: ${hash}`);
    console.log(`------------------------------------------------------`);
    console.log(
      `COPIE o hash acima e use-o para atualizar a coluna SENHA_HASH no seu banco de dados.`,
    );
    return hash;
  } catch (error) {
    console.error('Erro ao gerar hash:', error);
  }
}

// --- MODIFIQUE AQUI A SENHA QUE VOCÊ QUER HASHEAR ---
const senhaParaHashear = 'gestor#forte'; // Ex: 'senha123' ou 'buddy@seguro' ou 'gestor#forte' node generate-hash.js
//node generate-hash.js
//npm run start:dev
// ----------------------------------------------------

// Executa a função
hashPassword(senhaParaHashear);
