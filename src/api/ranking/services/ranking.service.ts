import { PrismaClient } from "@prisma/client";

// src/services/ranking.service.ts
export class RankingService {
  constructor(private prisma: PrismaClient) {}

  async getRankings() {
    return this.prisma.steamApp.findMany();
  }
}
