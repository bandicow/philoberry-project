import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
