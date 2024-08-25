const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/todos", (req, res) => {
  db.all("SELECT * FROM todos", (err, rows) => {
    res.json(rows);
  });
});

app.post("/todos", (req, res) => {
  const { task } = req.body;
  db.run("INSERT INTO todos (task) VALUES (?)", [task], (err) => {
    res.status(201).json({ message: "Todo added" });
  });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;
  db.run(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [completed, id],
    (err) => {
      res.json({ message: "Todo updated" });
    }
  );
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM todos WHERE id = ?", [id], (err) => {
    res.json({ message: "Todo deleted" });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
