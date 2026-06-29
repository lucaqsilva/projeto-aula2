const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Estudar Node.js",
    completed: false
  }
];

let nextId = 2;

// Rota inicial
app.get("/", (req, res) => {
  res.send("API TodoApp rodando!");
});

// Listar tarefas
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Buscar tarefa por ID
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Tarefa nao encontrada" });
  }

  res.json(task);
});

// Criar tarefa
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "O titulo e obrigatorio" });
  }

  const newTask = {
    id: nextId++,
    title,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Atualizar tarefa
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Tarefa nao encontrada" });
  }

  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(task);
});

// Deletar tarefa
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskExists = tasks.some(t => t.id === id);

  if (!taskExists) {
    return res.status(404).json({ message: "Tarefa nao encontrada" });
  }

  tasks = tasks.filter(t => t.id !== id);

  res.json({ message: "Tarefa removida com sucesso" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
