# Sistema de Gestão Financeira Pessoal

## Descrição
Aplicação web completa para gestão financeira pessoal, desenvolvida com Node.js, Express, TypeORM, MySQL no backend e React, Vite, TypeScript no frontend.

## Funcionalidades

### Autenticação
- Cadastro de usuários
- Login seguro com JWT
- Criptografia de senhas com bcrypt

### Gestão de Categorias
- Criar, editar e excluir categorias
- Categorização de gastos personalizável

### Gestão de Transações
- Registro de receitas e despesas
- Upload de anexos (PDF/imagem)
- Filtros por data, categoria e tipo
- Visualização de saldo atual

### Dashboard
- Visão geral do saldo
- Últimas transações
- Interface intuitiva

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- TypeORM
- MySQL
- bcrypt (criptografia)
- jsonwebtoken (JWT)
- class-validator (validação)
- multer (upload de arquivos)
- CORS

### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM

## Estrutura do Projeto

```
backend/
├── routes/          # Rotas da API
├── middleware/      # Middlewares (auth, validação)
├── controller/      # Controladores
├── service/         # Lógica de negócio
├── repository/      # Acesso a dados
├── model/           # Modelos/Entidades
└── app.ts           # Servidor principal

frontend/
├── src/
│   ├── components/  # Componentes React
│   ├── service/     # Serviços HTTP
│   ├── routes/      # Páginas/Rotas
│   ├── types/       # Tipos TypeScript
│   └── utils/       # Utilitários
└── vite.config.ts   # Configuração Vite
```

## Configuração e Execução

### Pré-requisitos
- Node.js 18+
- MySQL 8.0+

### Backend
1. Navegue para a pasta backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Execute o servidor:
   ```bash
   npm run dev
   ```

### Frontend
1. Navegue para a pasta frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Banco de Dados
1. Crie o banco de dados MySQL:
   ```sql
   CREATE DATABASE financial_app;
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'app_password';
   GRANT ALL PRIVILEGES ON financial_app.* TO 'app_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

## Segurança

A aplicação implementa as seguintes medidas de segurança:

- **SQL Injection**: Proteção via TypeORM e queries parametrizadas
- **XSS**: Sanitização automática do React e validação de entrada
- **CSRF**: Autenticação JWT stateless
- **Mass Assignment**: DTOs com validação explícita
- **Session Hijacking**: JWT com expiração
- **Validação de Entrada**: Validação dupla (frontend/backend)
- **Autenticação**: Senhas criptografadas com bcrypt

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login

### Categorias
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Excluir categoria

### Transações
- `GET /api/transactions` - Listar transações
- `POST /api/transactions` - Criar transação
- `PUT /api/transactions/:id` - Atualizar transação
- `DELETE /api/transactions/:id` - Excluir transação
- `GET /api/transactions/balance` - Obter saldo

## Licença
Este projeto foi desenvolvido para fins educacionais.

