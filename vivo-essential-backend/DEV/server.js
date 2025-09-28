// server.js

// --- 1. IMPORTAÇÃO DAS FERRAMENTAS ---
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// --- 2. BANCO DE DADOS FALSO ---
const users = {
  'gestor@vivo.com': { password: '123', role: 'gestor', nome: 'Carlos Gerente' },
  'buddy@vivo.com': { password: '123', role: 'buddy', nome: 'Beatriz Buddy' },
  'funcionario@vivo.com': { password: '123', role: 'newuser', nome: 'Ana Novaes' },
};

// --- 3. CONFIGURAÇÃO DO SERVIDOR (MIDDLEWARES) ---
app.use(session({
  secret: 'vivo-essential-um-segredo-bem-guardado',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname)));


// --- 4. A ROTA DE LOGIN ---
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Email ou senha inválidos.' });
  }

  req.session.user = {
    email: email,
    role: user.role,
    nome: user.nome
  };

  const responseData = {
    message: 'Login bem-sucedido!',
    user: req.session.user
  };
  
  res.status(200).json(responseData);
});


// --- 5. OS "SEGURANÇAS" DAS PÁGINAS (MIDDLEWARES DE PROTEÇÃO) ---
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.session.user.role !== role) {
      return res.status(403).send('<h1>403 - Acesso Proibido</h1><p>Você não tem permissão para acessar esta página.</p>');
    }
    next();
  };
}


// --- 6. ROTAS PROTEGIDAS ---
app.get('/home_gestor.html', requireLogin, requireRole('gestor'), (req, res) => {
  res.sendFile(path.join(__dirname, 'home_gestor.html'));
});

app.get('/home_buddy.html', requireLogin, requireRole('buddy'), (req, res) => {
  res.sendFile(path.join(__dirname, 'home_buddy.html'));
});

app.get('/home_newuser.html', requireLogin, requireRole('newuser'), (req, res) => {
  res.sendFile(path.join(__dirname, 'home_newuser.html'));
});


// --- CORREÇÃO: ADICIONANDO A ROTA DE LOGOUT ---
app.get('/logout', (req, res) => {
  // O comando req.session.destroy() encerra a sessão do usuário.
  req.session.destroy((err) => {
    if (err) {
      // Se houver algum erro, mostra no console
      return console.log(err);
    }
    // Após destruir a sessão, redireciona o usuário para a página de login.
    res.redirect('/'); 
  });
});
// ---------------------------------------------


// --- 7. INICIANDO O SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor VIVO ESSENTIAL está no ar em http://localhost:${PORT}`);
});