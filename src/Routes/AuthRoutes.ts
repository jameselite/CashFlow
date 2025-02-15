import { Router } from "express";
import { RegisterController } from "../Controllers/RegisterController";

const router = Router();

router.post("/register", RegisterController);

export default router;