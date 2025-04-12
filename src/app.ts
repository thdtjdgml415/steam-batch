import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rankingRoutes from "./api/ranking/route/ranking.route";

dotenv.config();
const app = express();

// 기본 설정
app.use(express.json());
app.use(cors());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Passport 초기화
// app.use(passport.initialize());
// app.use(passport.session());
// configurePassport();

// 라우트 연결
// app.use("/auth", authRoute);
app.use("/api", rankingRoutes);
export default app;
