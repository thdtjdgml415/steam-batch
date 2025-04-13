import passport from "passport";
import SteamStrategy from "passport-steam";
import { AuthService } from "../service/auth.service";
import { JWT } from "../utils/jwt.util";

export const configurePassport = () => {
  passport.use(
    new SteamStrategy(
      {
        returnURL: `${process.env.BASE_URL}/auth/steam/return`,
        realm: process.env.BASE_URL!,
        apiKey: process.env.STEAM_API_KEY!,
      },
      async (identifier: string, profile: any, done) => {
        console.log("configurePassport", identifier, profile, done);
        try {
          // Steam ID 추출
          const user = await AuthService.handleSteamAuth(profile._json);

          // JWT 생성
          const token = JWT.generateToken({
            userId: user.id,
            steamId: user.steamId,
            username: user.username,
          });

          done(null, { user, token });
        } catch (error) {
          done(error as Error);
        }
      }
    )
  );
};

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await AuthService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
