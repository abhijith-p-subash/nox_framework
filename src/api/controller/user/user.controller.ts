import { User } from "./../../../models/database/user.model";
import { Request, Response } from "express";
import { Job } from "../../../core/utils/job";
import { UserService } from "./../../../services/user.service";
// import User from "../../../models/database/user.model";

const userService = new UserService(User);

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await userService.findAll(new Job({}));

    return res.send({ data: "WELCOME", test: data });
  } catch (error) {
    return res.status(400).send(error);
    console.error(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    console.log("???????????????????CONTROLLER req");
    console.log(req.body);
    console.log("???????????????????CONTROLLER req");
    
    const data = await userService.create(
      new Job({
        body: {
          ...req.body
        },
      })
    );

    return res.status(201).send({ data: "data", msg: "OK" });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

