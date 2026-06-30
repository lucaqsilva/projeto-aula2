# Projeto Aula 2 - TodoApp

Este projeto é uma aplicação simples de gerenciamento de tarefas, desenvolvida para praticar a criação de uma API REST com Node.js e Express, além da integração com uma interface em React.

O sistema permite cadastrar, listar, marcar como concluídas e remover tarefas. Ele representa um exemplo básico de CRUD, muito usado para entender como o frontend se comunica com o backend por meio de requisições HTTP.

## Tecnologias utilizadas

- Node.js
- Express
- CORS
- React
- Vite
- JavaScript

## Funcionalidades

- Listar todas as tarefas cadastradas
- Buscar uma tarefa pelo ID
- Criar uma nova tarefa
- Atualizar o título ou o status de uma tarefa
- Marcar tarefas como concluídas
- Remover tarefas
- Exibir uma interface simples para interação com a lista

## Como executar o projeto

Primeiro, instale as dependências:

```bash
npm install
```

Para iniciar a API:

```bash
npm start
```

O servidor será executado em:

```text
http://localhost:18081
```

Para iniciar o frontend em modo de desenvolvimento:

```bash
npm run dev:react
```

## Rotas da API

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/` | Exibe uma mensagem inicial da API |
| GET | `/api/tasks` | Lista todas as tarefas |
| GET | `/api/tasks/:id` | Busca uma tarefa pelo ID |
| POST | `/api/tasks` | Cria uma nova tarefa |
| PUT | `/api/tasks/:id` | Atualiza uma tarefa |
| DELETE | `/api/tasks/:id` | Remove uma tarefa |

## Exemplos de requisição

Criar uma tarefa:

```json
{
  "title": "Estudar Express"
}
```

Atualizar uma tarefa:

```json
{
  "title": "Estudar Node.js",
  "completed": true
}
```

## Resumo para apresentação

O TodoApp é um projeto que demonstra a integração entre backend e frontend. No backend, foi criada uma API REST usando Node.js e Express, responsável por controlar as tarefas. No frontend, foi criada uma interface em React para que o usuário consiga adicionar, visualizar, concluir e remover tarefas de forma prática.

Esse projeto ajuda a entender conceitos importantes como rotas, métodos HTTP, manipulação de dados em JSON, comunicação entre cliente e servidor e estrutura básica de uma aplicação web.
