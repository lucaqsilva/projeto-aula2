# Projeto Aula 2 - API TodoApp

API simples de tarefas feita com Node.js, Express e CORS.

## Como rodar

```bash
npm install
npm start
```

Servidor:

```text
http://localhost:3000
```

## Rotas

```text
GET    /                  Mensagem inicial
GET    /api/tasks          Lista todas as tarefas
GET    /api/tasks/:id      Busca uma tarefa por ID
POST   /api/tasks          Cria uma tarefa
PUT    /api/tasks/:id      Atualiza uma tarefa
DELETE /api/tasks/:id      Remove uma tarefa
```

Exemplo para criar uma tarefa:

```json
{
  "title": "Estudar Express"
}
```

Exemplo para atualizar uma tarefa:

```json
{
  "title": "Estudar Node.js",
  "completed": true
}
```
