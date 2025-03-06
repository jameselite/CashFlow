import type { JwtPayload } from "jsonwebtoken";
import type { TheUser } from "../../src/Middlewares/AuthCheck";

declare global {
    namespace Express {
        interface Request {
            user?: TheUser | JwtPayload | undefined;
        }
    }
}