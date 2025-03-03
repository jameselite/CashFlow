import { Router } from "express";
import { RegisterController } from "../Controllers/RegisterController";
import { VerifyUserController } from "../Controllers/VerifyUserController";
import { LoginController } from "../Controllers/LoginController";

const router = Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/verifyaccount", VerifyUserController);

export default router;