import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const migrationPath = fileURLToPath(new URL("../../migrations/001_create_destinations.sql", import.meta.url));

try {
  const migration = await readFile(migrationPath, "utf8");
  await pool.query(migration);
  console.log("Database schema is up to date.");
} finally {
  await pool.end();
}
