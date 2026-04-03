import * as schema from "./schema";

// Type for the database instance
type DbInstance = any;

let _db: DbInstance | null = null;

function getDb(): DbInstance {
  if (_db) return _db;

  // On Vercel (serverless), better-sqlite3 native module isn't available
  // Return a no-op proxy that returns empty results for all queries
  if (process.env.VERCEL) {
    _db = createNoOpDb();
    return _db;
  }

  try {
    const { drizzle } = require("drizzle-orm/better-sqlite3");
    const Database = require("better-sqlite3");
    const path = require("path");
    const dbPath = path.join(process.cwd(), "data", "spine-trainer.db");
    const sqlite = new Database(dbPath);
    sqlite.pragma("journal_mode = WAL");
    _db = drizzle(sqlite, { schema });
  } catch {
    _db = createNoOpDb();
  }

  return _db;
}

function createNoOpDb(): any {
  const noOpChain: any = new Proxy(
    {},
    {
      get: () =>
        new Proxy(() => noOpChain, {
          apply: () => noOpChain,
          get: (_, prop) => {
            if (prop === "get") return () => null;
            if (prop === "all") return () => [];
            if (prop === "run") return () => ({});
            return () => noOpChain;
          },
        }),
    }
  );
  return noOpChain;
}

// Export as a getter so it initializes lazily
export const db = new Proxy({} as DbInstance, {
  get: (_, prop) => {
    const instance = getDb();
    return instance[prop];
  },
});
