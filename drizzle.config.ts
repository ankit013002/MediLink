import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || databaseUrl.trim() === "") {
  throw new Error(
    "DATABASE_URL is required for drizzle-kit. Set it in .env.local.",
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
