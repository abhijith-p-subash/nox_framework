import { Router } from "express";
import {
  create,
  getAll,
  getCount,
  getById,
  getOne,
  update,
  deleteOne,
} from "../../controller/login-log/login-log.controller";

const loginLogRouter = Router();

loginLogRouter.post("/", create);
loginLogRouter.get("/", getAll);
loginLogRouter.get("/count", getCount);
loginLogRouter.get("/find", getOne);
loginLogRouter.get("/:id", getById);
loginLogRouter.put("/:id", update);
loginLogRouter.delete("/:id", deleteOne);

export default loginLogRouter;
