// server.js

// --- 1. IMPORTAÇÃO DAS FERRAMENTAS ---
// Importamos o 'Express', que é a estrutura do nosso servidor.
// O 'path' nos ajuda a encontrar os arquivos no nosso projeto.
// O 'session' é o que nos permite "lembrar" que um usuário fez login.
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000; // O servidor rodará na porta 3000

// --- 2. BANCO DE DADOS FALSO ---
// Em um projeto real, isso estaria em um banco de dados seguro.
// Para nosso exemplo, vamos definir os usuários permitidos aqui.
// A 'role' (perfil) é a parte mais importante para o redirecionamento.
const users = {
  // Usuário Gestor
  'gestor@vivo.com': { password: '123', role: 'gestor', nome: 'Carlos Gerente' },
  // Usuário Buddy
  'buddy@vivo.com': { password: '123', role: 'buddy', nome: 'Beatriz Buddy' },
  // Usuário Novo Funcionário
  'funcionario@vivo.com': { password: '123', role: 'newuser', nome: 'Ana Novaes' },
};

// --- 3. CONFIGURAÇÃO DO SERVIDOR (MIDDLEWARES) ---

// a) Configuração da Sessão: A "memória" do servidor
app.use(session({
  secret: 'vivo-essential-um-segredo-bem-guardado', // Chave para proteger as sessões
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // O login dura 1 hora (em milissegundos)
}));

// b) Habilita o servidor para receber dados em formato JSON do frontend
app.use(express.json());

// c) Define a pasta raiz do projeto como pública para servir arquivos como CSS, imagens e o próprio script.js
app.use(express.static(path.join(__dirname)));


// --- 4. A ROTA DE LOGIN ---
// Esta é a rota que o seu script.js chama quando o formulário é enviado.
app.post('/login', (req, res) => {
  const { email, password } = req.body; // Pega o email e a senha enviados
  const user = users[email]; // Procura o usuário no nosso banco de dados falso

  // Validação: Se o usuário não existe ou a senha está errada...
  if (!user || user.password !== password) {
    // ...envia uma resposta de erro 401 (Não Autorizado) para o frontend.
    return res.status(401).json({ message: 'Email ou senha inválidos.' });
  }

  // Se o login estiver correto, salvamos os dados do usuário na sessão.
  // É como dar um "crachá" de acesso para o navegador do usuário.
  req.session.user = {
    email: email,
    role: user.role,
    nome: user.nome
  };

  // Prepara a resposta de sucesso para o frontend.
  // O frontend precisa saber para onde redirecionar e quem é o usuário.
  const responseData = {
    message: 'Login bem-sucedido!',
    user: req.session.user // Enviamos de volta os dados do usuário logado
  };
  
  // Envia a resposta de sucesso (status 200).
  res.status(200).json(responseData);
});


// --- 5. OS "SEGURANÇAS" DAS PÁGINAS (MIDDLEWARES DE PROTEÇÃO) ---

// Segurança 1: Verifica se o usuário está logado.
function requireLogin(req, res, next) {
  if (!req.session.user) {
    // Se não tiver um "crachá" (sessão), é mandado de volta para a página de login.
    return res.redirect('/');
  }
  // Se estiver logado, pode passar para a próxima verificação.
  next();
}

// Segurança 2: Verifica se o usuário tem o perfil (role) correto para a página.
function requireRole(role) {
  return (req, res, next) => {
    // Compara o perfil do "crachá" com o perfil exigido pela página.
    if (req.session.user.role !== role) {
      // Se os perfis não batem, mostra uma mensagem de "Acesso Proibido".
      return res.status(403).send('<h1>403 - Acesso Proibido</h1><p>Você não tem permissão para acessar esta página.</p>');
    }
    // Se o perfil for o correto, pode acessar a página.
    next();
  };
}


// --- 6. ROTAS PROTEGIDAS ---
// Agora, em vez de deixar os arquivos HTML públicos, nós os servimos através
// das nossas verificações de segurança.

// Para acessar /home_gestor.html, o usuário precisa:
// 1. Estar logado (requireLogin)
// 2. Ter o perfil 'gestor' (requireRole('gestor'))
app.get('/home_gestor.html', requireLogin, requireRole('gestor'), (req, res) => {
  res.sendFile(path.join(__dirname, 'home_gestor.html'));
});

// O mesmo para as outras páginas, cada uma com seu perfil exigido.
app.get('/home_buddy.html', requireLogin, requireRole('buddy'), (req, res) => {
  res.sendFile(path.join(__dirname, 'home_buddy.html'));
});

app.get('/home_newuser.html', requireLogin, requireRole('newuser'), (req, res) => {
  res.sendFile(path.join(__dirname, 'home_newuser.html'));
});


// --- 7. INICIANDO O SERVIDOR ---
// Comando final que liga o servidor e o faz "ouvir" por requisições na porta 3000.
app.listen(PORT, () => {
  console.log(`Servidor VIVO ESSENTIAL está no ar em http://localhost:${PORT}`);
});