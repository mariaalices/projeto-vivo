# 🚀 VIVO ESSENTIAL - Time Flow Makers

**Plataforma integrada de jornada de onboarding para aumentar a efetividade da jornada de 90 dias na VIVO**

## 📋 Sobre o Projeto

O **Vivo Essential** é uma plataforma completa desenvolvida pelo **Time Flow Makers** para otimizar a jornada de onboarding de novos colaboradores na VIVO. A solução oferece:

- 👨‍💼 **Dashboard para Gestores**: Acompanhamento de equipes e métricas
- 🤝 **Sistema de Buddy**: Mentoria e suporte entre colaboradores
- 📚 **Portal do Novo Colaborador**: Trilhas de aprendizado e recursos
- 🔐 **Autenticação segura**: Sistema de login com JWT
- 📊 **Avaliações e feedback**: Sistema de acompanhamento de progresso

## 🛠️ Tecnologias Utilizadas

### Backend

- **NestJS** - Framework Node.js robusto e escalável
- **TypeScript** - Linguagem tipada para maior segurança
- **SQLite** - Banco de dados portável (funciona sem configuração)
- **TypeORM** - ORM para manipulação do banco
- **JWT** - Autenticação segura
- **bcrypt** - Hash de senhas

### Frontend

- **HTML5 + CSS3** - Estrutura e estilização
- **TailwindCSS** - Framework CSS utilitário
- **JavaScript ES6+** - Interatividade e lógica do frontend

## ⚡ Instalação Rápida (Para Avaliadores)

### Pré-requisitos

- **Node.js 16+** instalado
- **Git** instalado

### 🎯 Passos para Execução

```bash
# 1. Clone o repositório
git clone https://github.com/mariaalices/projeto-vivo.git
cd projeto-vivo

# 2. Navegue para o backend
cd vivo-essential-backend/backend

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
cp .env.example .env

# 5. Execute o projeto
npm run start
```

### 🌐 Acesso à Plataforma

Após executar, abra seu navegador em:
**http://localhost:3000**

## 👥 Usuários de Teste

O sistema cria automaticamente usuários para teste:

| Tipo             | Email                          | Senha    | Descrição                |
| ---------------- | ------------------------------ | -------- | ------------------------ |
| Novo Colaborador | `novo.colaborador@vivo.com.br` | `123456` | Dashboard do colaborador |
| Buddy            | `buddy@vivo.com.br`            | `123456` | Sistema de mentoria      |
| Gestor           | `gestor@vivo.com.br`           | `123456` | Dashboard gerencial      |

## 📁 Estrutura do Projeto

```
projeto-vivo/
├── vivo-essential-backend/
│   ├── backend/                 # API NestJS
│   │   ├── src/
│   │   │   ├── auth/           # Módulo de autenticação
│   │   │   ├── entities/       # Entidades do banco
│   │   │   └── main.ts         # Entrada da aplicação
│   │   └── package.json        # Dependências do backend
│   └── DEV/                    # Frontend estático
│       ├── css/                # Estilos CSS
│       ├── js/                 # Scripts JavaScript
│       ├── imagens/            # Assets e imagens
│       ├── index.html          # Página de login
│       ├── home_newuser.html   # Dashboard novo colaborador
│       ├── home_buddy.html     # Dashboard buddy
│       └── home_gestor.html    # Dashboard gestor
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento (com hot-reload)
npm run start:dev

# Produção
npm run start

# Build
npm run build

# Testes
npm run test
```

## 📊 Funcionalidades Principais

### ✅ Implementado

- [x] Sistema de autenticação JWT
- [x] Database SQLite portável com seeder automático
- [x] Dashboard responsivo para 3 tipos de usuário
- [x] Sistema de trilhas de aprendizado
- [x] Interface de avaliação e feedback
- [x] Sistema de mentoria (Buddy)
- [x] Métricas e acompanhamento de progresso

### 🚧 Roadmap Futuro

- [ ] Notificações em tempo real
- [ ] Sistema de gamificação
- [ ] Integração com APIs da VIVO
- [ ] App mobile (React Native)
- [ ] BI e Analytics avançados

## 👨‍💻 Equipe - Time Flow Makers

- **Bruna Gomes**
- **Carlos Eduardo**
- **MAria Alice**
- **Rickson Hirata**
- **Thais Costa**

## 🏢 Para a VIVO

Este projeto foi desenvolvido seguindo **Gestão da Qualidade Total (TQM)** com foco em:

- **📈 Performance**: Código otimizado e arquitetura escalável
- **🔒 Confiabilidade**: Logs detalhados e tratamento de erros
- **🛠️ Manutenibilidade**: Código limpo e bem documentado
- **👥 Usabilidade**: Interface intuitiva seguindo padrões da VIVO
- **🚀 Portabilidade**: Funciona em qualquer máquina sem configuração complexa

## 📞 Suporte

Para dúvidas ou problemas durante a avaliação:

- Verifique se todas as dependências foram instaladas
- Confirme se o arquivo `.env` existe (copie do `.env.example`)
- Verifique se a porta 3000 não está sendo usada

---

**💜 Desenvolvido com dedicação pelo Time Flow Makers para revolucionar o onboarding na VIVO! 🚀**
