import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

const prismaClient = global.prisma;

process.on("beforeExit", async () => {
  await prismaClient.$disconnect();
});

export default prismaClient;
