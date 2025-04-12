// src/services/database.service.ts
import { PrismaClient } from "@prisma/client";
import { SteamGameDetail } from "./steam-api.service";
import { DateUtils } from "../utils/date.util";

export class DatabaseService {
  constructor(private prisma: PrismaClient) {}

  async upsertGameData(appId: string, data: any, ranking: number) {
    console.log("upsertGameData ------", data);
    const gameData = data[appId].data; // 실제 데이터가 위치한 경로
    const releaseDateStr = gameData.release_date?.date; // "2024년 2월 15일"
    const releaseDate = DateUtils.parseKoreanDate(releaseDateStr);
    console.log("upsertGameData ----- releaseDate", releaseDate);
    await this.prisma.$transaction([
      this.prisma.steamApp.upsert({
        where: { steamAppId: gameData.steam_appid },
        update: {
          rate: ranking,
          type: gameData.type,
          name: gameData.name,
          requiredAge: Number(gameData.required_age) ?? -1,
          isFree: gameData.is_free,
          detailedDescription: gameData.detailed_description,
          aboutTheGame: gameData.about_the_game,
          shortDescription: gameData.short_description,
          supportedLanguages: gameData.supported_languages,
          headerImageUrl: gameData.header_image,
          websiteUrl: gameData.website,
          releaseDate,
          comingSoon: gameData.release_date?.coming_soon,
          background: gameData.background,
          capsuleImageUrl: gameData.capsule_imagev5,
        },
        create: {
          rate: ranking,
          steamAppId: gameData.steam_appid,
          type: gameData.type,
          name: gameData.name,
          requiredAge: Number(gameData.required_age) ?? -1,
          isFree: gameData.is_free,
          detailedDescription: gameData.detailed_description,
          aboutTheGame: gameData.about_the_game,
          shortDescription: gameData.short_description,
          supportedLanguages: gameData.supported_languages,
          headerImageUrl: gameData.header_image,
          websiteUrl: gameData.website,
          releaseDate,
          comingSoon: gameData.release_date?.coming_soon,
          background: gameData.background,
          capsuleImageUrl: gameData.capsule_imagev5,
        },
      }),
      // this.prisma.priceOverview.upsert({
      //   /* ... */
      // }),
    ]);
  }
}
