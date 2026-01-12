// lib/db.ts
import { PrismaClient } from "@prisma/client";

// 전역 변수에 prisma를 저장해둠
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
