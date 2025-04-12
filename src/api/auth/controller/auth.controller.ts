import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const AuthController = {
  initiateSteamAuth: passport.authenticate("steam"),

  handleSteamCallback: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("steam", async (err: Error, user: any) => {
      if (err) return next(err);
      req.logIn(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        res.redirect("/profile");
      });
    })(req, res, next);
  },

  getProfile: (req: Request, res: Response) => {
    if (!req.user) return res.redirect("/");
    res.json(req.user);
  },

  logout: (req: Request, res: Response) => {
    req.logout(() => res.redirect("/"));
  },
};
