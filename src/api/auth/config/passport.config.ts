import passport from "passport";
import SteamStrategy from "passport-steam";
import { AuthService } from "../service/auth.service";

export const configurePassport = () => {
  passport.serializeUser((user: any, done) => done(null, user.id));

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await AuthService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new SteamStrategy(
      {
        returnURL: `${process.env.BASE_URL}/auth/steam/return`,
        realm: process.env.BASE_URL!,
        apiKey: process.env.STEAM_API_KEY!,
      },
      async (identifier: string, profile: any, done) => {
        try {
          const user = await AuthService.handleSteamAuth(profile._json);
          done(null, user);
        } catch (error) {
          done(error as Error);
        }
      }
    )
  );
};
