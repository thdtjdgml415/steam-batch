import { Router } from "express";
import { RankingController } from "../controller/ranking.controller";

const router = Router();
router.get("/rankings", (req, res) => RankingController.getRankings(req, res));

export default router;
