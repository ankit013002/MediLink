import { db } from "./index";
import { migrate } from "drizzle-orm/node-postgres/migrator";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set — make sure .env.local exists.");
  process.exit(1);
}

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
      migrationsSchema: "public",
    });
    console.log("Migration completed");
  } catch (error) {
    console.error("Migration Error:", error);
    process.exit(1);
  }
};

main();
