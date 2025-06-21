// src/App.js
import React, { useState, useEffect } from "react";
import "./Todo.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todoTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (task.trim() === "") {
      alert("🚫 Task cannot be empty!");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleRemove = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  });

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc"
      ? a.text.localeCompare(b.text)
      : b.text.localeCompare(a.text)
  );

  return (
    <div className="todo-container">
      <h1>🌟 To-Do List App</h1>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="todo-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Show All</option>
          <option value="active">Active Only</option>
          <option value="completed">Completed Only</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      <ul className="todo-list">
        {sorted.length === 0 ? (
          <li className="no-tasks">No tasks yet 🤷‍♀️</li>
        ) : (
          sorted.map((t) => (
            <li key={t.id} className={t.completed ? "done" : ""}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id)}
              />
              <span>{t.text}</span>
              <button onClick={() => handleRemove(t.id)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
