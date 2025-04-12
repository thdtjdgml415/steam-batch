import { SteamAPIService } from "../services/steam-api.service";
import { DatabaseService } from "../services/database.service";

export class BatchProcessor {
  private rankingCounter = 0;

  constructor(
    private steamAPI: SteamAPIService,
    private dbService: DatabaseService
  ) {}

  async processBatch() {
    try {
      const top100 = await this.steamAPI.fetchTop100Games();

      for (const appId of top100) {
        await this.processSingleGame(appId);
      }

      console.log("Batch processing completed successfully");
    } catch (error) {
      console.error("Batch processing failed:", error);
    }
  }

  private async processSingleGame(appId: string) {
    try {
      const gameData = await this.steamAPI.fetchGameDetails(appId);
      await this.dbService.upsertGameData(appId, gameData, this.nextRanking());
      console.log(`[${appId}] Processed successfully`);
    } catch (error) {
      console.error(`[${appId}] Processing failed:`, error);
    }
  }

  private nextRanking(): number {
    return this.rankingCounter++;
  }
}
