import { useEffect, useMemo, useState } from "react";

const API_URL = "/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const completedCount = useMemo(
    () => tasks.filter(task => task.completed).length,
    [tasks]
  );

  async function loadTasks() {
    try {
      setError("");
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Nao foi possivel carregar as tarefas.");
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createTask(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Digite uma tarefa antes de adicionar.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: trimmedTitle })
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel criar a tarefa.");
      }

      const newTask = await response.json();
      setTasks(currentTasks => [...currentTasks, newTask]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleTask(task) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: !task.completed })
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel atualizar a tarefa.");
      }

      const updatedTask = await response.json();
      setTasks(currentTasks =>
        currentTasks.map(currentTask =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(taskId) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel remover a tarefa.");
      }

      setTasks(currentTasks =>
        currentTasks.filter(currentTask => currentTask.id !== taskId)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="page-shell">
      <section className="todo-panel" aria-labelledby="page-title">
        <div className="panel-header">
          <div>
            <p className="eyebrow">TodoApp</p>
            <h1 id="page-title">Minhas tarefas</h1>
          </div>

          <div className="summary" aria-label="Resumo das tarefas">
            <strong>{completedCount}</strong>
            <span>de {tasks.length} concluidas</span>
          </div>
        </div>

        <form className="task-form" onSubmit={createTask}>
          <label htmlFor="task-title">Nova tarefa</label>
          <div className="form-row">
            <input
              id="task-title"
              type="text"
              placeholder="Ex: Estudar React"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <button type="submit" disabled={saving}>
              {saving ? "Adicionando..." : "Adicionar"}
            </button>
          </div>
        </form>

        {error && <p className="message error">{error}</p>}

        <div className="task-list" aria-live="polite">
          {loading ? (
            <p className="message">Carregando tarefas...</p>
          ) : tasks.length === 0 ? (
            <p className="message">Nenhuma tarefa cadastrada.</p>
          ) : (
            tasks.map(task => (
              <article
                className={task.completed ? "task done" : "task"}
                key={task.id}
              >
                <label className="task-check">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                  />
                  <span>{task.title}</span>
                </label>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                >
                  Remover
                </button>
              </article>
            ))
          )}
        </div>
      </section>

      <footer className="page-footer">
        Projeto criado por Lucas Nicoli da Silva
      </footer>
    </main>
  );
}

export default App;
