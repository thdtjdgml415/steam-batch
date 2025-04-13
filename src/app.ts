import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { configurePassport } from "./api/auth/config/passport.config";
import authRoute from "./api/auth/route/auth.route";
import rankingRoutes from "./api/ranking/route/ranking.route";

dotenv.config();
const app = express();

// 기본 설정
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 쿠키 유효기간 (24시간)
    },
  })
);

// Passport 설정
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// 라우트 연결
app.use("/auth", authRoute);
app.use("/api", rankingRoutes);

export default app;
