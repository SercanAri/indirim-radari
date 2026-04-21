import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
    // Migration'lar için doğrudan bağlantı (pgbouncer bypass)
    directUrl: process.env.DIRECT_URL,
  },
});
