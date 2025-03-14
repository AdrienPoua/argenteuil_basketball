import { PrismaClient } from '@prisma/client';

// PrismaClient est attaché au global object dans les environnements de développement pour éviter
// d'épuiser les connexions DB pendant le hot-reloading
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Initialize Prisma Client with logging for debugging
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
