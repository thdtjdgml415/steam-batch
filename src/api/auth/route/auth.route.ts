import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();

router.get("/steam", AuthController.initiateSteamAuth);
router.get("/steam/return", AuthController.handleSteamCallback);
router.get("/profile", AuthController.getProfile);
router.get("/logout", AuthController.logout);

export default router;
