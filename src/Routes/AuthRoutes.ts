import { Router } from "express";
import { RegisterController } from "../Controllers/RegisterController";
import { VerifyUserController } from "../Controllers/VerifyUserController";
import { LoginController } from "../Controllers/LoginController";
import { LogoutController } from "../Controllers/LogoutController";

const router = Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.post("/logout", LogoutController);
router.get("/verifyaccount", VerifyUserController);

export default router;