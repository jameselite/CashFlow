import { Router } from "express";
import { RegisterController } from "../Controllers/Auth/RegisterController";
import { VerifyUserController } from "../Controllers/Auth/VerifyUserController";
import { LoginController } from "../Controllers/Auth/LoginController";
import { LogoutController } from "../Controllers/Auth/LogoutController";

const router = Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.post("/logout", LogoutController);
router.get("/verifyaccount", VerifyUserController);

export default router;