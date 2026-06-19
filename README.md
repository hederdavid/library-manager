# Library Manager — Front-end

Front-end do sistema de gerenciamento de biblioteca escolar, desenvolvido em **Vue 3** com o framework **Quasar**. Consome a API REST do [backend em Spring Boot](https://github.com/Rebecafa02/GerenciamentoBiblioteca).

## Tecnologias

- **Vue 3**
- **Quasar Framework 2** (Quasar CLI with Vite)
- **Vue Router**
- **Pinia** (gerenciamento de estado)
- **ApexCharts** (`vue3-apexcharts`) para os gráficos do dashboard
- **ESLint + Prettier**

## Funcionalidades

A aplicação possui telas para os mesmos módulos do backend:

| Tela | Rota | Descrição |
|---|---|---|
| Login | `/entrar` | Autenticação de acesso |
| Painel (Dashboard) | `/painel` | Visão geral com estatísticas e gráficos |
| Empréstimos | `/emprestimos` | Empréstimo, devolução e histórico de livros |
| Alunos | `/alunos` | Cadastro de alunos |
| Turmas | `/turmas` | Cadastro de turmas |
| Livros | `/livros` | Acervo da biblioteca |
| Cursos | `/cursos` | Cadastro de cursos |
| Matérias | `/materias` | Cadastro de matérias |
| Estoque | `/estoque` | Quantidades e condições dos exemplares |
| Campus | `/campus` | Cadastro de campi |

## Pré-requisitos

- **Node.js** ^22.12, ^24, ^26 ou ^28
- **npm**, **yarn** ou **pnpm**
- O [backend](../GerenciamentoBiblioteca) rodando em `http://localhost:8080` (necessário para os módulos que já consomem a API real)

## Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/hederdavid/library-manager.git
cd library-manager
```

Instale as dependências:

```bash
npm install
# ou
yarn
# ou
pnpm install
```

## Como executar (modo desenvolvimento)

```bash
npm run dev
```

Isso abre a aplicação automaticamente no navegador, com hot-reload.

> Durante o desenvolvimento, o Quasar redireciona (proxy) todas as requisições feitas para `/api` diretamente para `http://localhost:8080` (configurado em `quasar.config.js`). Por isso é necessário que o backend esteja rodando para as telas que consomem dados reais.

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/spa`.

## Lint e formatação

```bash
npm run lint      # roda o ESLint
npm run format    # formata os arquivos com Prettier
```

## Dados mockados

Algumas funcionalidades ainda não possuem endpoint correspondente no backend e usam dados mockados, controlados em `src/services/mockConfig.js`:

```js
export const mockConfig = {
  usarMockDashboard: false,
  usarMockAutenticacao: true,
  usarMockEmprestimos: false,
}
```

- **`usarMockAutenticacao`**: está `true` por padrão — o login atualmente não valida contra o backend, apenas simula um usuário autenticado. Altere para `false` quando o endpoint de autenticação estiver disponível.

Quando o backend implementar os endpoints correspondentes, basta alterar a flag para `false` em cada módulo para passar a consumir a API real.

## Estrutura do projeto

```
src/
├── boot/            # Arquivos de inicialização do Quasar (Pinia, ApexCharts)
├── components/
│   ├── base/         # Componentes genéricos (tabela, dialog de formulário)
│   ├── crud/          # Formulários de cada entidade (Aluno, Curso, Livro, etc.)
│   ├── dashboard/      # Componentes do painel (gráficos, estatísticas, pendências)
│   └── loans/          # Componentes da tela de empréstimos
├── composables/      # Lógica reutilizável (ex: useCrud, useNotify)
├── css/               # Estilos globais e variáveis do Quasar
├── layouts/           # Layouts (autenticado e de login)
├── pages/             # Páginas/telas da aplicação
├── router/            # Configuração de rotas
├── services/          # Comunicação com a API (um arquivo por entidade) + mock config
└── stores/            # Stores Pinia
```

## Documentação adicional

Para customizar a configuração do build, veja a documentação oficial do Quasar: [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
