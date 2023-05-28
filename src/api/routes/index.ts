import roleRouter from "./route/role.route";
import userRouter from "./route/user.route";
import authRouter from "./route/auth.route";
import { Router } from "express";
import passport from "passport";

const routes = Router();

export default routes;

routes.use("/auth", authRouter);
routes.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
routes.use(
  "/role",
  passport.authenticate("jwt", { session: false }),
  roleRouter
);
