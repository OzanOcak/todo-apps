import express from "express";
import { db } from './db'; // Import the db connection
import { todos } from './migrations/schema'; // Import the schema
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Fetch all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await db.select().from(todos);
    res.json(result);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

// Add a new todo
app.post("/todos", async (req, res) => {
  const { task } = req.body;
  try {
    await db.insert(todos).values({ task });
    res.status(201).json({ message: "Todo added" });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "Error adding todo" });
  }
});

// Update a todo's completion status
app.put("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;
  try {
    await db.update(todos).set({ completed }).where(todos.id.equals(id));
    res.json({ message: "Todo updated" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Error updating todo" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.delete(todos).where(todos.id.equals(id));
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Error deleting todo" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});