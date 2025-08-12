# Estrutura do Projeto Voxly Frontend

## Nova Arquitetura

O projeto foi reestruturado seguindo as melhores práticas do Next.js 15 e gerenciamento de estado moderno com Zustand.

### 📁 Estrutura de Pastas

```
src/
├── app/                    # App Router do Next.js 15
│   ├── dashboard/         # Página do dashboard
│   ├── login/            # Página de login
│   ├── layout.tsx        # Layout raiz
│   ├── header.tsx        # Header da aplicação
│   └── page.tsx          # Página inicial
├── components/           # Componentes React
│   ├── auth/            # Componentes de autenticação
│   ├── chart/           # Componentes de gráficos
│   ├── sidebar/         # Sidebar de navegação
│   └── ui/              # Componentes UI base (shadcn/ui)
├── hooks/               # Custom hooks
│   ├── useAuth.ts       # Hook de autenticação
│   ├── useDashboard.ts  # Hook do dashboard
│   └── index.ts         # Barrel exports
├── lib/                 # Utilitários e configurações
│   ├── utils.ts         # Funções auxiliares
│   └── api-config.ts    # Configurações da API
├── services/            # Services para API
│   ├── api.ts           # Cliente HTTP base
│   ├── auth.service.ts  # Service de autenticação
│   ├── dashboard.service.ts # Service do dashboard
│   └── index.ts         # Barrel exports
├── stores/              # Stores do Zustand
│   ├── auth.store.ts    # Store de autenticação
│   ├── dashboard.store.ts # Store do dashboard
│   └── index.ts         # Barrel exports
└── types/               # TypeScript interfaces
    ├── auth.ts          # Types de autenticação
    ├── api.ts           # Types da API
    ├── dashboard.ts     # Types do dashboard
    └── index.ts         # Barrel exports
```

## 🔧 Tecnologias Utilizadas

### Estado Global
- **Zustand**: Gerenciamento de estado simples e eficiente
- **Persist middleware**: Persistência automática no localStorage

### API
- **Fetch API**: Cliente HTTP nativo com wrapper customizado
- **TypeScript**: Tipagem forte para todas as requisições
- **Error Handling**: Tratamento de erros padronizado

### Componentes
- **React 19**: Última versão com melhorias de performance
- **Next.js 15**: App Router com server/client components
- **Radix UI**: Componentes acessíveis
- **Tailwind CSS 4**: Estilização moderna

## 🚀 Como Usar

### Autenticação
```typescript
import { useAuth } from '@/hooks';

const { user, login, logout, isLoading, isAuthenticated } = useAuth();

// Login com redirecionamento automático
await loginAndRedirect(email, password, '/dashboard');

// Logout com redirecionamento
logoutAndRedirect('/login');
```

### Dashboard
```typescript
import { useDashboard } from '@/hooks';

const { 
  metrics, 
  chartData, 
  isLoadingMetrics, 
  fetchMetrics,
  refreshData 
} = useDashboard();
```

### Services
```typescript
import { authService, dashboardService } from '@/services';

// Autenticação
const response = await authService.login({ email, password });

// Dashboard
const metrics = await dashboardService.getMetrics();
```

### Stores (uso direto)
```typescript
import { useAuthStore, useDashboardStore } from '@/stores';

// Acesso direto ao store (não recomendado, use os hooks)
const authStore = useAuthStore();
```

## 🎯 Padrões de Desenvolvimento

### 1. **Separação de Responsabilidades**
- **Components**: Apenas apresentação e interação
- **Hooks**: Lógica de negócio e estado
- **Services**: Comunicação com API
- **Stores**: Estado global
- **Types**: Definições TypeScript

### 2. **Nomenclatura**
- **Hooks**: `use` + nome descritivo (ex: `useAuth`)
- **Services**: nome + `.service.ts` (ex: `auth.service.ts`)
- **Stores**: nome + `.store.ts` (ex: `auth.store.ts`)
- **Types**: nome + `.ts` (ex: `auth.ts`)

### 3. **Imports**
- Use barrel exports (`index.ts`) para imports limpos
- Importe apenas o necessário
- Prefira imports nomeados sobre default

### 4. **Error Handling**
- Todas as chamadas de API têm tratamento de erro
- Estados de loading e error nos stores
- Feedback visual para o usuário

## 🔄 Fluxo de Dados

```
Component -> Hook -> Store -> Service -> API
                 ↙
            State Update
```

1. **Component** chama um **Hook**
2. **Hook** acessa o **Store**
3. **Store** usa **Service** para API
4. **Service** faz request para **API**
5. Response atualiza o **Store**
6. **Component** reage à mudança de estado

## 📝 Próximos Passos

1. ✅ Implementar autenticação com Zustand
2. ✅ Criar services para API
3. ✅ Migrar componentes para nova estrutura
4. 🔄 Adicionar mais features conforme necessário
5. 🔄 Implementar testes unitários
6. 🔄 Configurar CI/CD

## 🎨 Benefícios da Nova Estrutura

### Performance
- **Zustand**: Mais leve que Context API
- **Seletores otimizados**: Re-renderizações mínimas
- **Persist**: Carregamento mais rápido

### Developer Experience
- **TypeScript**: Tipagem completa
- **Hooks customizados**: Reutilização de lógica
- **Separação clara**: Fácil manutenção
- **Barrel exports**: Imports organizados

### Escalabilidade
- **Modular**: Fácil adicionar novos módulos
- **Testável**: Cada parte pode ser testada isoladamente
- **Flexível**: Estrutura adaptável a mudanças
