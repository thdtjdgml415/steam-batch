// // models/steam-app.model.ts
// import { PrismaClient } from '@prisma/client';
// import { SteamGameData } from '../types/steam.type';
// export class SteamAppModel {
//   constructor(private prisma: PrismaClient) {}

//   async upsertSteamApp(data: SteamGameData) {
//     return this.prisma.steamApp.upsert({
//       where: { steamAppId: data.steam_appid },
//     //   update: { ... },
//     //   create: { ... }
//     });
//   }
// }
