import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const DATABASE_URL = process.env.DATABASE_URL!;

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
