import { Router, Request, Response } from "express";
import { RootController } from "../../modules/root/root.controller";

const rootRouter = Router();
const rootController = new RootController();

rootRouter.post("/", rootController.create);
rootRouter.get("/", rootController.getAll);
rootRouter.get("/count", rootController.getCount);
rootRouter.get("/find", rootController.getOne);
rootRouter.get("/:id", rootController.getById);
rootRouter.put("/:id", rootController.update);
rootRouter.delete("/:id", rootController.deleteOne);


export default rootRouter;
