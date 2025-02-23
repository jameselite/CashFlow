import { Router } from "express";
import { RegisterController } from "../Controllers/RegisterController";
import { VerifyUserController } from "../Controllers/VerifyUserController";

const router = Router();

router.post("/register", RegisterController);
router.get("/verifyaccount", VerifyUserController);

export default router;