import { Router } from "express";
import passport from "passport";
import loginLogRouter from "./route/login-log.route";
import userRouter from "./route/user.route";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/login-logs", loginLogRouter);

export default routes;
