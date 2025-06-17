import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

const database = globalThis.prisma ?? prismaClientSingleton();

export default database;

if (process.env.NODE_ENV !== "production") globalThis.prisma = database;
