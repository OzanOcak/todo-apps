import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  task: text("task").notNull(),
  completed: integer("completed", { mode: "boolean" })
    .default(false)
    .notNull()
    .default(false),
});

module.exports = todos;
