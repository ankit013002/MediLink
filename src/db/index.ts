import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || databaseUrl.trim() === "") {
  throw new Error(
    "DATABASE_URL is required to initialize the database connection. Set it in .env.local.",
  );
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle(pool);
