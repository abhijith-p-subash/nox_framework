import { Router } from "express";
// import User from "../../../models/database/user.model";
import { UserService } from "../../../services/user.service";
import {getAll, create} from "../../controller/user/user.controller";

const userRouter = Router();
// const userCtrl = new UserController(User);

userRouter.get("/", getAll);
userRouter.post("/", create);

export default userRouter;
