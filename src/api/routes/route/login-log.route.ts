import { Router } from "express";
import {
  create,
  getAll,
  update,
  deleteOne
} from "../../controller/login-log/login-log.controller";

const loginLogRouter = Router();

loginLogRouter.post("/", create);
loginLogRouter.get("/", getAll);
loginLogRouter.put("/:id", update);
loginLogRouter.delete("/:id", deleteOne);

export default loginLogRouter;
