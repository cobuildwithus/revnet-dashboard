import { PrismaClient } from "@prisma/revnet";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

const database = global.prisma ?? prismaClientSingleton();

export default database;

if (process.env.NODE_ENV !== "production") globalThis.prisma = database;
