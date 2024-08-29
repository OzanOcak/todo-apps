// drizzle.config.ts
import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./database/schemas",
  out: "./migrations",
 // driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;