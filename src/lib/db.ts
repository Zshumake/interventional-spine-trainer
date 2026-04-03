import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";

let db: ReturnType<typeof drizzle>;

try {
  // better-sqlite3 is an optional dependency — may not be available on serverless
  const Database = require("better-sqlite3");
  const dbPath = path.join(process.cwd(), "data", "spine-trainer.db");
  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  db = drizzle(sqlite, { schema });
} catch {
  // Create a no-op proxy that returns empty results
  // This allows the app to build and serve content pages without SQLite
  db = new Proxy({} as any, {
    get: () => ({
      select: () => ({ from: () => ({ where: () => ({ get: () => null, all: () => [] }), get: () => null, all: () => [] }) }),
      insert: () => ({ values: () => ({ run: () => {} }) }),
      update: () => ({ set: () => ({ where: () => ({ run: () => {} }) }) }),
    }),
  });
}

export { db };
