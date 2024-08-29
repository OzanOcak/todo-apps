```console
brew install pnpm
mkdir server && cd server
pnpm init
pnpm i -D typescript @types/node
npx tsc --init
code .
```
opentsconfig.json
```json
"outDir":"./dist"
```

```console
pnpm install express cores dotenv
pnpm install -D @types/express @types/cors
pnpm install -D ts-node nodemon
code index.ts
```

```typescript
import "dotenv/config";
import express from "express";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());

app.listen(8080, ()=>console.log("Server is running on port 8080"));
```
package.json
```json
"scripts": {
    "dev": "nodemon ./index.ts",
    "start": "node ./dist/index.js",
    "build": "tsc"
}
```
```console
pnpm build
pnpm add drizzle-orm better-sqlite3
pnpm add -D drizzle-kit @types/better-sqlite3
code database/connection.ts
```
// connection.ts
```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);
```

```console
code schemas/todos.ts
```

// migrations/schema.ts

```typescript
import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  task: text('task').notNull(),
  completed: boolean('completed').default(false),
});
```
// drizzle.config.ts

```typescript
import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./database/schemas",
  out: "./migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./database.db",
  },
} satisfies Config;
```
package.json
```json
"scripts": {
    "migration:generate": "drizzle-kit generate:sqlite",
  },
```

```console
pnpm migration:generate
code database/migrate.ts
```
// utils/migrate.ts
```typescript
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import "dotenv/config";
import { db } from "../database/connection";

console.log("Running migrations...");
migrate(db, { migrationsFolder: "migrations" });
```

//package.json
```json
"scripts": {
    "migration:run": "ts-node ./utils/migrate.ts",
    "drizzle:studio": "drizzle-kit studio"
  },
  },
```
```console
migration:run
drizzle:studio
```
// update express server
```typescript
// server/index.js
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
```


