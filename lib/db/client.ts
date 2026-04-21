// Prisma client — generate (`npx prisma generate`) çalıştırıldıktan sonra
// tip güvenli hale gelir. Şimdilik any cast ile devam ediliyor.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { PrismaClient } = require("prisma") as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as { prisma: any };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
