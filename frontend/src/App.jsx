import { useEffect, useState } from "react";
import "./App.css";

function App() {
const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [priority, setPriority] = useState("Medium");
const [dueDate, setDueDate] = useState("");
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const [editingId, setEditingId] = useState(null);
const [saving, setSaving] = useState(false);

const API = "http://localhost:8080/api/tasks";

async function loadTasks() {
try {
const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to load tasks.");
  }

  setTasks(await response.json());
} catch (error) {
  console.error(error);
  alert(
    "Unable to connect to the backend. Please make sure the backend server is running."
  );
} finally {
  setLoading(false);
}

}

useEffect(() => {
loadTasks();
}, []);

function resetForm() {
setTitle("");
setDescription("");
setPriority("Medium");
setDueDate("");
setEditingId(null);
}

function editTask(task) {
setEditingId(task.id);
setTitle(task.title || "");
setDescription(task.description || "");
setPriority(task.priority || "Medium");
setDueDate(task.dueDate || "");

window.scrollTo({ top: 0, behavior: "smooth" });

}

async function saveTask(event) {
event.preventDefault();

if (!title.trim()) {
  alert("Please enter a task title.");
  return;
}

setSaving(true);

try {
  const existingTask = tasks.find(
    (task) => task.id === editingId
  );

  const taskData = {
    title: title.trim(),
    description,
    priority,
    status: existingTask?.status || "Pending",
    dueDate: dueDate || null,
  };

  const isEditing = editingId !== null;

  const response = await fetch(
    isEditing ? `${API}/${editingId}` : API,
    {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to save task.");
  }

  resetForm();
  await loadTasks();

  alert(
    isEditing
      ? "Task updated successfully!"
      : "Task added successfully!"
  );
} catch (error) {
  console.error(error);
  alert(
    "Unable to save the task. Please check the backend and database."
  );
} finally {
  setSaving(false);
}

}

async function updateStatus(task) {
const newStatus =
task.status === "Completed" ? "Pending" : "Completed";

try {
  const response = await fetch(`${API}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...task,
      status: newStatus,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not update task status.");
  }

  await loadTasks();
} catch (error) {
  console.error(error);
  alert("Unable to update the task status. Please try again.");
}

}

async function deleteTask(id) {
if (!window.confirm("Are you sure you want to delete this task?")) {
return;
}

try {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete task.");
  }

  if (editingId === id) {
    resetForm();
  }

  await loadTasks();
} catch (error) {
  console.error(error);
  alert("Unable to delete the task. Please try again.");
}

}

const filteredTasks = tasks.filter((task) => {
const matchesSearch = (task.title || "")
.toLowerCase()
.includes(search.toLowerCase().trim());

const matchesFilter =
  filter === "All" ||
  (filter === "Pending" && task.status !== "Completed") ||
  (filter === "Completed" && task.status === "Completed") ||
  (filter === "High Priority" && task.priority === "High");

return matchesSearch && matchesFilter;

});

const completed = tasks.filter(
(task) => task.status === "Completed"
).length;

return (
<main className="app">
<header className="topbar">
<div className="brand">
<span className="brand-icon">✓</span>
<span>TaskFlow</span>
</div>
<span className="top-label">MY WORKSPACE</span>
</header>

  <section className="welcome">
    <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
    <h1>Make today count.</h1>
    <p className="subtitle">
      Organize your tasks, focus on priorities, and get things done.
    </p>
  </section>

  <section className="stats">
    <div className="stat-card">
      <span>Total Tasks</span>
      <strong>{tasks.length}</strong>
    </div>

    <div className="stat-card">
      <span>Pending</span>
      <strong>{tasks.length - completed}</strong>
    </div>

    <div className="stat-card">
      <span>Completed</span>
      <strong>{completed}</strong>
    </div>
  </section>

  <section className="content">
    <div className="panel form-panel">
      <h2>{editingId !== null ? "Edit Task" : "Create a Task"}</h2>

      <p className="panel-subtitle">
        {editingId !== null
          ? "Update your task details below."
          : "Add something to your to-do list."}
      </p>

      <form onSubmit={saveTask}>
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Complete project"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details..."
          rows="3"
        />

        <div className="form-row">
          <div>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <button
          className="add-button"
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : editingId !== null
              ? "Update Task"
              : "+ Add Task"}
        </button>

        {editingId !== null && (
          <button
            className="cancel-edit-button"
            type="button"
            onClick={resetForm}
            disabled={saving}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>

    <div className="panel tasks-panel">
      <div className="tasks-heading">
        <div>
          <h2>Your Tasks</h2>
          <p className="panel-subtitle">
            Everything you need to do.
          </p>
        </div>

        <span className="task-count">{filteredTasks.length}</span>
      </div>

      <div className="task-filters">
        <input
          type="text"
          placeholder="Search tasks..."
          aria-label="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          aria-label="Filter tasks"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="High Priority">High Priority</option>
        </select>
      </div>

      {loading ? (
        <p className="empty-state">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">☑</span>
          <h3>No Tasks Yet</h3>
          <p>Add your first task using the form.</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <h3>No Matching Tasks</h3>
          <p>Try another search term or filter.</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <article className="task-item" key={task.id}>
              <div className="task-main">
                <h3
                  className={
                    task.status === "Completed" ? "done" : ""
                  }
                >
                  {task.title}
                </h3>

                {task.description && <p>{task.description}</p>}

                <div className="task-meta">
                  <span
                    className={`priority ${(
                      task.priority || "Medium"
                    ).toLowerCase()}`}
                  >
                    {task.priority || "Medium"}
                  </span>

                  {task.dueDate && (
                    <span>Due: {task.dueDate}</span>
                  )}
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>

                <button
                  className="status-button"
                  type="button"
                  onClick={() => updateStatus(task)}
                >
                  {task.status === "Completed"
                    ? "Mark as Pending"
                    : "Mark as Completed"}
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  </section>

  <footer>TaskFlow · Small steps, big progress.</footer>
</main>

);
}

export default App;