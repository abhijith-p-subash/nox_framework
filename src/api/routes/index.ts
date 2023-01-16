import { Router } from "express";
import passport from "passport";
import loginLogRouter from "./route/login-log.route";
import userRouter from "./route/user.route";
import authRouter from "./route/auth.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
routes.use("/login-logs", loginLogRouter);

export default routes;
