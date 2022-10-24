import { Router } from "express";
import userRouter from "./route/user";

const routes = Router();


routes.use("/user", userRouter)



export default routes;