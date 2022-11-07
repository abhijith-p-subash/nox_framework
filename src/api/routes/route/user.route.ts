import { Router, Request, Response } from "express";
// import {
//   UserController
// } from "../../controller/user/user.controller";
import { UserController } from "../../modules/user/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.get("/", userController.getAll);
userRouter.get("/count", userController.getCount);
userRouter.get("/find", userController.getOne);
userRouter.get("/:id", userController.getById);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.deleteOne);


export default userRouter;
