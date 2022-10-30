import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import { queryValidation } from "./../../../core/utils/validation";
import { ValidationError } from "./../../../core/utils/errors";
import { User } from "./../../../models/database/user.model";
import { Job } from "../../../core/utils/job";
import { UserService } from "./../../../services/user.service";
import {
  BadRequest,
  Created,
  ErrorResponse,
  Result,
} from "../../../core/utils/response";

const userService = new UserService(User);

export const getAll = async (req: Request, res: Response) => {
  queryValidation(req.query);
  const { data, count, limit, offset, error } = await userService.findAll(
    new Job({
      action: "findAll",
      options: {
        ...queryValidation(req.query),
      },
    })
  );
  if (!!error) { 
    return ErrorResponse(res, { error, message: `${error.message || error}` });
  }
  return Result(res, {
    data: { user: data, count, limit, offset },
    message: "Ok",
  });
};

export const create = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(uuidv4());
  
  const { data, error } = await userService.create(
    new Job({
      action: "create",
      body: {
        uid: uuidv4(), 
        ...req.body,
      },
    })
  );

  if (!!error) {
    if (error instanceof ValidationError) {
      return BadRequest(res, {
        error,
        message: error.message,
      });
    }
    return ErrorResponse(res, {
      error,
      message: `${error.message || error}`,
    });
  }
  return Created(res, { data: { user: data }, message: "Created" });
};
