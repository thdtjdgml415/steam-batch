import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express"; // Ensure correct imports for Request and Response
import { RankingService } from "../services/ranking.service";

export class RankingController {
  constructor(private prisma: PrismaClient) {}
  static async getRankings(req: Request, res: Response) {
    // 컨트롤러에서 사용
    const rankingService = new RankingService(new PrismaClient());
    try {
      const rankings = await rankingService.getRankings();
      res.status(200).json(rankings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
