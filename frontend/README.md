# Aplicativo de Finanças Pessoais - Frontend

Frontend do aplicativo de finanças pessoais desenvolvido com **React**, **Vite** e **TypeScript**.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **TypeScript** - Superset tipado do JavaScript
- **React Router DOM** - Gerenciamento de rotas
- **Axios** - Cliente HTTP para requisições
- **Tailwind CSS** - Framework CSS utilitário

## 📦 Instalação

```bash
# Instalar dependências
npm install
```

## 🔧 Configuração

O frontend está configurado para se conectar ao backend na URL `http://localhost:3001/api`. 

Se você precisar alterar essa URL, edite o arquivo `src/service/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Altere aqui
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Basename das Rotas

O aplicativo está configurado com o basename `/secure-finances-app`. Isso significa que todas as rotas serão prefixadas com esse caminho.

Para alterar o basename, edite o arquivo `src/routes/router.tsx`:

```typescript
<BrowserRouter basename="/secure-finances-app">
```

## 🏃 Como Executar

```bash
# Modo de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173/secure-finances-app`

## 🏗️ Build para Produção

```bash
# Gerar build de produção
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

## 📁 Estrutura do Projeto

```
public/
├── assets/             # Assets públicos (imagens, ícones, etc)

src/
├── components/         # Componentes reutilizáveis
│   ├── Layout/
│   │   └── index.tsx
│   └── ProtectedRoute/
│       └── index.tsx
├── hooks/             # Hooks customizados
│   ├── useAxios.ts    # Hook para requisições HTTP
│   ├── useDebounce.ts # Hook para debounce
│   └── index.ts       # Exportações dos hooks
├── pages/             # Páginas principais (organizadas por entidade)
│   ├── Login/
│   │   ├── index.tsx      # Página de login
│   │   ├── Register.tsx   # Página de registro
│   │   └── routes.ts      # Rotas de autenticação
│   ├── Dashboard/
│   │   ├── index.tsx      # Dashboard principal
│   │   └── routes.ts      # Rotas do dashboard
│   ├── Category/
│   │   ├── CategoryList.tsx  # Listagem de categorias
│   │   └── routes.ts         # Rotas de categorias
│   ├── Transaction/
│   │   ├── TransactionList.tsx  # Listagem de transações
│   │   └── routes.ts            # Rotas de transações
│   ├── Loading/
│   │   └── index.tsx      # Página de loading
│   └── NotFound/
│       └── index.tsx      # Página 404
├── routes/            # Configuração de rotas (basename: 'secure-finances-app')
│   ├── router.tsx         # Router principal
│   ├── PrivateRoute.tsx   # Componente de rota privada
│   └── LazyRoutes.ts      # Lazy loading das rotas
├── service/           # Serviços de API
│   ├── api.ts
│   ├── authService.ts
│   ├── categoryService.ts
│   └── transactionService.ts
├── types/             # Declaração de tipos TypeScript
│   └── index.ts
├── utils/             # Funções utilitárias
│   └── auth.ts
├── App.tsx            # Componente principal
├── main.tsx           # Ponto de entrada
└── index.css          # Estilos globais
```

## 🎨 Funcionalidades

- ✅ Autenticação de usuários (login/registro)
- ✅ Dashboard com resumo financeiro
- ✅ Gerenciamento de transações
- ✅ Gerenciamento de categorias
- ✅ Interface responsiva e moderna
- ✅ Proteção de rotas
- ✅ Lazy loading de rotas
- ✅ Hooks customizados (useAxios, useDebounce)

## 🔐 Autenticação

O aplicativo utiliza tokens JWT armazenados no localStorage para gerenciar a sessão do usuário. As requisições são feitas com `withCredentials: true` para enviar os cookies automaticamente.

## 🪝 Hooks Customizados

### useAxios

Hook para realizar requisições HTTP com Axios:

```typescript
import { useAxios } from './hooks';

const { data, loading, error, refetch } = useAxios({
  url: '/transactions',
  method: 'GET'
});
```

### useDebounce

Hook para debounce de valores:

```typescript
import { useDebounce } from './hooks';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

## 🛣️ Sistema de Rotas

O sistema de rotas utiliza lazy loading para otimizar o carregamento da aplicação:

1. **router.tsx**: Router principal que configura o BrowserRouter com basename
2. **PrivateRoute.tsx**: Componente que protege rotas privadas
3. **LazyRoutes.ts**: Importa e combina todas as rotas das páginas
4. **routes.ts** (em cada página): Define as rotas específicas de cada entidade

### Adicionando Novas Rotas

Para adicionar uma nova rota:

1. Crie uma nova pasta em `src/pages/` com o nome da entidade
2. Crie os componentes da página (ex: `EntityList.tsx`, `EntityCreate.tsx`)
3. Crie um arquivo `routes.ts` na pasta da entidade:

```typescript
import { lazy } from 'react';

const EntityList = lazy(() => import('./EntityList'));

const entityRoutes = [
  {
    path: '/entities',
    component: EntityList,
  },
];

export default entityRoutes;
```

4. Importe e adicione as rotas em `src/routes/LazyRoutes.ts`:

```typescript
import entityRoutes from '../pages/Entity/routes';

const routes = [
  ...dashboardRoutes,
  ...categoryRoutes,
  ...transactionRoutes,
  ...entityRoutes, // Adicione aqui
];
```

## 📝 Notas Importantes

- Certifique-se de que o backend está rodando antes de iniciar o frontend
- O backend deve estar configurado para aceitar requisições CORS do frontend
- As sessões são mantidas através de tokens JWT no localStorage
- O basename das rotas está configurado como `/secure-finances-app`
- Todas as rotas protegidas devem estar dentro do componente `<Layout />`

## 🐛 Solução de Problemas

### Erro de CORS
Se você encontrar erros de CORS, verifique se o backend está configurado corretamente para aceitar requisições do frontend.

### Erro de conexão
Certifique-se de que o backend está rodando na porta 3001 ou ajuste a URL base no arquivo `src/service/api.ts`.

### Rotas não funcionando
Verifique se o basename está configurado corretamente no arquivo `src/routes/router.tsx` e se corresponde ao caminho do servidor.

### Erro de importação
Certifique-se de que todos os imports estão usando os caminhos relativos corretos após a refatoração.

## 📄 Licença

Este projeto foi desenvolvido para fins demonstrativos.
