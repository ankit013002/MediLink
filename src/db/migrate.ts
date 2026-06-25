import { db, pool } from "./index";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
      // Uses public schema instead of the default drizzle schema to avoid
      // needing CREATE SCHEMA privileges on fresh local PostgreSQL installs.
      // Safe here because local postgres is a clean DB with no prior migration history.
      migrationsSchema: "public",
    });
    console.log("Migration completed");
  } catch (error) {
    console.error("Migration Error:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

main();
