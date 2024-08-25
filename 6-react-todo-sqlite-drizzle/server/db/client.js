import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient(todos.db);

export const db = drizzle(client);

// const result = await db.select().from(todos).all()
