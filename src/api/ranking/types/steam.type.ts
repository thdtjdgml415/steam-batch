export interface SteamGameResponse {
  [appId: string]: {
    success: boolean;
    data: SteamGameData;
  };
}
export interface SteamGameData {
  steam_appid: number;
  name: string;
  required_age: string;
  // ... 다른 필드들
}
