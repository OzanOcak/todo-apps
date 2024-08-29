import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import "dotenv/config";
import { db } from "../database/connection";

console.log("Running migrations...");
migrate(db, { migrationsFolder: "migrations" });