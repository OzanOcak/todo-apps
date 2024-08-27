const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3001;

// Set up PostgreSQL connection
const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "todos",
  password: "password",
  port: 5432,
});

app.use(express.json());
app.use(cors());

// Fetch all todos
app.get("/todos", (req, res) => {
  pool.query("SELECT * FROM todos", (error, result) => {
    if (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Error fetching todos" });
    } else {
      res.json(result.rows);
    }
  });
});

// Add a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  pool.query(
    "INSERT INTO todos (task, completed) VALUES ($1, false)",
    [task],
    (error, result) => {
      if (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ error: "Error adding todo" });
      } else {
        res.status(201).json({ message: "Todo added" });
      }
    }
  );
});

// Update a todo's completion status
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;
  pool.query(
    "UPDATE todos SET completed = $1 WHERE id = $2",
    [completed, id],
    (error, result) => {
      if (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Error updating todo" });
      } else {
        res.json({ message: "Todo updated" });
      }
    }
  );
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  pool.query("DELETE FROM todos WHERE id = $1", [id], (error, result) => {
    if (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Error deleting todo" });
    } else {
      res.json({ message: "Todo deleted" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
