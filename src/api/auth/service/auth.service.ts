import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SteamProfile {
  steamid: string;
  personaname: string;
  avatarfull: string;
}

export const AuthService = {
  async handleSteamAuth(profile: SteamProfile) {
    return prisma.user.upsert({
      where: { steamId: profile.steamid },
      update: {
        username: profile.personaname,
        avatar: profile.avatarfull,
      },
      create: {
        steamId: profile.steamid,
        username: profile.personaname,
        avatar: profile.avatarfull,
      },
    });
  },

  async getUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },
};
