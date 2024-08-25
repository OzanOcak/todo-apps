const express = require("express");
const cors = require("cors");
const db = require("./db/client");
const todos = require("./db/schema");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await db.select().from(todos);
    res.json(allTodos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  try {
    await db.insert(todos).values({ task });
    res.status(201).json({ message: "Todo added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding todo" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;
  try {
    await db.update(todos).set({ completed }).where(todos.id.equals(id));
    res.json({ message: "Todo updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.delete(todos).where(todos.id.equals(id));
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
