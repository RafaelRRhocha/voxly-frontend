# Voxly Frontend

![Versão](https://img.shields.io/badge/versão-1.0.2-blue.svg)

Interface de usuário do projeto Voxly, desenvolvida com Next.js 15, React 19 e Tailwind CSS 4.

## Requisitos

- Node.js 20.x ou superior
- npm 10.x ou superior

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone git@github.com:RafaelRRhocha/voxly-frontend.git
cd voxly-frontend
npm install --legacy-peer-deps
```

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:3001](http://localhost:3001).

## Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento com Turbopack na porta 3001
- `npm run build` - Compila o projeto para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa a verificação de linting
- `npm run format` - Formata os arquivos com Prettier
- `npm run lint:fix` - Corrige automaticamente problemas de linting

## Estrutura do Projeto
```
voxly-frontend/
├── src/
│   ├── app/         # Rotas e páginas da aplicação
│   ├── components/  # Componentes reutilizáveis
│   └── lib/         # Utilitários e funções auxiliares
├── public/          # Arquivos estáticos
└── ...              # Arquivos de configuração
```

## Tecnologias Principais
- **Framework**: Next.js 15
- **UI Library**: React 19
- **Estilização**: Tailwind CSS 4
- **Componentes**: Radix UI
- **Gráficos**: Recharts
- **Linting**: ESLint 9
- **Formatação**: Prettier 3
