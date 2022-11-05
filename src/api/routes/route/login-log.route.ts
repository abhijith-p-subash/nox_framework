import { Router, Request, Response } from "express";
import { LoginLogController } from "../../controller/login-log/login-log.controller";

const loginLogRouter = Router();
const loginLogController = new LoginLogController();

loginLogRouter.post("/", loginLogController.create);
loginLogRouter.get("/", loginLogController.getAll);
loginLogRouter.get("/count", loginLogController.getCount);
loginLogRouter.get("/find", loginLogController.getOne);
loginLogRouter.get("/:id", loginLogController.getById);
loginLogRouter.put("/:id", loginLogController.update);
loginLogRouter.delete("/:id", loginLogController.deleteOne);


export default loginLogRouter;
