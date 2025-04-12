declare global {
  namespace Express {
    interface User {
      id: number;
      steamId: string;
      username: string;
      avatar?: string;
    }
  }
}
