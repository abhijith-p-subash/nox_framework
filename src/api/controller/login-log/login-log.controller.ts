import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { NotFoundError } from "../../../core/utils/errors";
import { Job } from "../../../core/utils/job";
import {
  BadRequest,
  Created,
  ErrorResponse,
  NotFound,
  Result,
} from "../../../core/utils/response";
import { queryValidation } from "../../../core/utils/validation";
import { LoginLogModel  } from "../../../models/mongo/login-log.model";
import { LoginLogService } from "./../../../services/login-log.service";

const loginLogService = new LoginLogService(LoginLogModel);

export const create = async (req: Request, res: Response) => {
  const { data, error } = await loginLogService.create(
    new Job({
      action: "create",
      body: {
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

export const getAll = async (req: Request, res: Response) => {
    queryValidation(req.query);
    const { data, count, limit, offset, error } = await loginLogService.findAll(
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

  export const getCount = async (req: Request, res: Response) => {
    queryValidation(req.query);
    const { data, count, limit, offset, error } = await loginLogService.getCount(
      new Job({
        action: "getCount",
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

  export const getById = async (req: Request, res: Response) => {
    const { data, error } = await loginLogService.findById(
      new Job({
        action: "findById",
        id: req.params.id,
        options: {
          ...queryValidation(req.query),
        },
      })
    );
    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record Not found`,
        });
      }
      return ErrorResponse(res, { error, message: `${error.message || error}` });
    }
    return Result(res, {
      data: { user: data },
      message: "Ok",
    });
  };

  export const getOne = async (req: Request, res: Response) => {
    const { data, error } = await loginLogService.findOne(
      new Job({
        action: "findOne",
        options: {
          ...queryValidation(req.query),
        },
      })
    );
    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record Not found`,
        });
      }
      return ErrorResponse(res, { error, message: `${error.message || error}` });
    }
    return Result(res, {
      data: { user: data },
      message: "Ok",
    });
  };
  


  export const update = async (req: Request, res: Response) => {
    const { data, error } = await loginLogService.update(
      new Job({
        action: "update",
        id: req.params.id,
        body: req.body,
      })
    );
    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record Not found`,
        });
      }
      return ErrorResponse(res, { error, message: `${error.message || error}` });
    }
    return Result(res, {
      data: { user: data },
      message: "Updated",
    });
  };
  

  export const deleteOne = async (req: Request, res: Response) => {
    const { data, error } = await loginLogService.delete(
      new Job({
        action: "delete",
        id: req.params.id,
        options: {
          ...queryValidation(req.query),
        },
      })
    );
    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record Not found`,
        });
      }
      return ErrorResponse(res, { error, message: `${error.message || error}` });
    }
    return Result(res, {
      data: { user: data },
      message: "Deleted",
    });
  };