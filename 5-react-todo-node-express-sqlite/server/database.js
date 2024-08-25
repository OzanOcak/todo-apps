const sqlite3 = require("sqlite3/lib/sqlite3").verbose();
const db = new sqlite3.Database("todos.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE
  )`);
});

module.exports = db;
