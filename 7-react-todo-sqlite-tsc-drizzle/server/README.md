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


## Tutorial: Setting Up a React Native Todo List App with Node.js, Express, SQLite, and Drizzle ORM
In this tutorial, we'll walk through the steps to set up a backend for a React Native Todo List application using Node.js, Express, SQLite, and Drizzle ORM. We'll cover the essential configurations, dependencies, and code needed to get everything running smoothly.

### Prerequisites
Before we begin, ensure you have the following installed:

Node.js (LTS version recommended)
Homebrew (for package management on macOS)
Visual Studio Code or any code editor of your choice
### Step 1: Install Dependencies
First, let's install pnpm, a fast and efficient package manager.

```console
brew install pnpm
```
#### Create and Initialize the Project
Next, create a new directory for your server and initialize a new Node.js project:

```console
mkdir server && cd server
pnpm init
```
#### Install TypeScript and Node Types
We'll need TypeScript and its types for Node.js:

```console
pnpm i -D typescript @types/node
npx tsc --init
```
### Update tsconfig.json
Open tsconfig.json and update the outDir to specify where compiled files should go:

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```
### Step 2: Set Up Express and Middleware
#### Install Express and related packages:

```console
pnpm install express cors dotenv
pnpm install -D @types/express @types/cors ts-node nodemon
```
#### Create the Main Server File
Create an index.ts file for your server:

```typescript
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(8080, () => console.log("Server is running on port 8080"));
```
#### Update package.json for Scripts
Add scripts in package.json:

```json
"scripts": {
    "dev": "nodemon ./index.ts",
    "start": "node ./dist/index.js",
    "build": "tsc"
}
```
### Step 3: Set Up Drizzle ORM and SQLite
Install Drizzle ORM and SQLite:

```console
pnpm install drizzle-orm better-sqlite3
pnpm install -D drizzle-kit @types/better-sqlite3
```
#### Database Connection
Create a database/connection.ts file:

```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);
```
#### Define Your Schema
Create a schemas/todos.ts file for your todo schema:

```typescript
import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  task: text('task').notNull(),
  completed: boolean('completed').default(false),
});
```
#### Configure Drizzle Kit
Create a drizzle.config.ts file:

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
#### Add Migration Scripts
Update your package.json:

```json
"scripts": {
    "migration:generate": "drizzle-kit generate:sqlite",
    "migration:run": "ts-node ./utils/migrate.ts",
    "drizzle:studio": "drizzle-kit studio"
}
```
#### Generate Migrations
Run the migration generation command:

```console
pnpm migration:generate
Create Migration Utility
Create a utils/migrate.ts file:
```
```typescript
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import "dotenv/config";
import { db } from "../database/connection";

console.log("Running migrations...");
migrate(db, { migrationsFolder: "migrations" });
```
#### Step 4: Implement API Endpoints
Update the Main Server File
Update your index.ts to include CRUD operations for todos:

```typescript
import express from "express";
import { db } from './database/connection'; 
import { todos } from './schemas/todos'; 
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
### Step 5: Run Your Application
Build the Project
Before running the server, build the project:

```console
pnpm build
```
#### Run Migrations
Run the migration:

```console
pnpm migration:run
```
#### Start the Server
Finally, start your server in development mode:

```console
pnpm dev
```
Your server should now be running at http://localhost:3001, and you can interact with the endpoints to manage your todo items.

#### Conclusion
You have successfully set up a backend for a React Native Todo List application using Node.js, Express, SQLite, and Drizzle ORM! You can now build a front-end application that interacts with this backend.