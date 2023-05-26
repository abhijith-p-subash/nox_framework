import { Router, Request, Response } from "express";
import { RoleController } from "../../modules/role/role.controller";

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.post("/", roleController.create);
roleRouter.get("/", roleController.getAll);
roleRouter.get("/count", roleController.getCount);
roleRouter.get("/find", roleController.getOne);
roleRouter.get("/:id", roleController.getById);
roleRouter.put("/:id", roleController.update);
roleRouter.delete("/:id", roleController.deleteOne);

export default roleRouter;
