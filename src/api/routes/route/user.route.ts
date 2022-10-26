import { Router } from "express";
import { getAll, create } from "../../controller/user/user.controller";

const userRouter = Router();

userRouter.get("/", getAll);
userRouter.post("/", create);

export default userRouter;
