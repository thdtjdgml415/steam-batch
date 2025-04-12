export interface SteamGameDetail {
  // ... 모든 필드 타입 정의
}

export class SteamAPIService {
  private static readonly BASE_DELAY_MS = 1500;

  async fetchTop100Games(): Promise<string[]> {
    const response = await fetch(
      "https://steamspy.com/api.php?request=top100in2weeks"
    );

    if (!response.ok) throw new Error("Failed to fetch top 100 games");
    return Object.keys(await response.json());
  }

  async fetchGameDetails(appId: string): Promise<any> {
    await this.delay();
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appId}&l=korean`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  private delay(): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(resolve, SteamAPIService.BASE_DELAY_MS)
    );
  }
}
