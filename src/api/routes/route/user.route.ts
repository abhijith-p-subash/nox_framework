import { Router } from "express";
import {
  create,
  getAll,
  getById,
  getOne,
  update,
  deleteOne,
} from "../../controller/user/user.controller";

const userRouter = Router();

userRouter.post("/", create);
userRouter.get("/", getAll);
userRouter.get("/find", getOne);
userRouter.get("/:id", getById);
userRouter.put("/:id", update);
userRouter.delete("/:id", deleteOne);

export default userRouter;
