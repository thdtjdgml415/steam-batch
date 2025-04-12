// src/main.ts
import { PrismaClient } from "@prisma/client";
import { SteamAPIService } from "./services/steam-api.service";
import { DatabaseService } from "./services/database.service";
import { BatchProcessor } from "./processor/batch.processor";

class Application {
  private prisma = new PrismaClient();
  private steamAPI = new SteamAPIService();
  private dbService = new DatabaseService(this.prisma);
  private batchProcessor = new BatchProcessor(this.steamAPI, this.dbService);

  async initialize() {
    try {
      await this.batchProcessor.processBatch();
    } catch (error) {
      console.error("Application error:", error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

// 애플리케이션 실행
new Application().initialize();
