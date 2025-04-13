import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const AuthController = {
  initiateSteamAuth: passport.authenticate("steam"),
  // return 후 처리
  // SteamStrategy에서 done()을 호출하면 이곳으로 돌아옴
  handleSteamCallback: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "steam",
      { failureRedirect: "/" },
      async (err: Error, user: any) => {
        const { token } = user;
        if (err) return next(err);

        req.logIn(user.user, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.redirect("/");
        });
      }
    )(req, res, next);
  },

  getProfile: (req: Request, res: Response) => {
    if (!req.user) return res.redirect("/");
    res.json(req.user);
  },

  logout: (req: Request, res: Response) => {
    req.logout(() => res.redirect("/"));
  },
};
