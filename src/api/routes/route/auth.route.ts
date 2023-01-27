import { Router, Request, Response } from "express";
import passport from "passport";
import { AuthController } from "../../modules/auth/auth.controller";
import { UserController } from "../../modules/user/user.controller";

const authRouter = Router();
const userController = new UserController();
const authController = new AuthController();

authRouter.post("/signup", authController.signup);

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.login
);

authRouter.post("/send-verification-email/:id", authController.sendVerificationEmail);
authRouter.get("/email-verification/:token", authController.emailVerification)

authRouter.get(
  "/test-security",
  passport.authenticate("jwt", { session: false }),
  authController.testSecurity
);

export default authRouter;
