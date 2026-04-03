import * as schema from "./schema";

let _db: any = null;

function getDb(): any {
  if (_db) return _db;

  try {
    const { drizzle } = require("drizzle-orm/better-sqlite3");
    const Database = require("better-sqlite3");
    const path = require("path");
    const dbPath = path.join(process.cwd(), "data", "spine-trainer.db");
    const sqlite = new Database(dbPath);
    sqlite.pragma("journal_mode = WAL");
    _db = drizzle(sqlite, { schema });
  } catch {
    // When better-sqlite3 is not available (Vercel serverless),
    // provide a stub that returns empty results for all queries.
    _db = createStubDb();
  }

  return _db;
}

function createStubDb(): any {
  // Build a chainable stub where every method returns another stub,
  // except terminal methods which return concrete empty values.
  const terminals: Record<string, () => any> = {
    get: () => null,
    all: () => [],
    run: () => ({}),
    execute: () => ({}),
    values: () => stub,
    set: () => stub,
  };

  const stub: any = new Proxy(() => stub, {
    get(_target, prop) {
      if (prop === Symbol.toPrimitive || prop === "valueOf" || prop === "toString") {
        return () => "";
      }
      if (prop === "length") return 0;
      if (prop === Symbol.iterator) return [][Symbol.iterator];
      if (typeof prop === "string" && terminals[prop]) {
        return terminals[prop];
      }
      // Any other property returns the stub itself for chaining
      return stub;
    },
    apply() {
      return stub;
    },
  });

  return stub;
}

// Export as a lazy getter
export const db: any = new Proxy(
  {},
  {
    get(_, prop) {
      return getDb()[prop];
    },
  }
);
