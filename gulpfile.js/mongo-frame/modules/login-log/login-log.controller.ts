import { Request, Response } from "express";
import { Body, Get, Route, Controller } from "tsoa";
import { ValidationError } from "sequelize";
import { NotFoundError } from "../../../core/utils/errors";
import { Job, JobResponse } from "../../../core/utils/job";
import {
  BadRequest,
  Created,
  ErrorResponse,
  NotFound,
  Result,
} from "../../../core/utils/response";
// import { LoginLog, LoginLogGetAllResponse } from "./loginlog.type";
import { queryValidation } from "../../../core/utils/validation";
import { LoginLogModel, LoginLog } from "./entity/login-log.model";
import { LoginLogService } from "./login-log.service";


const loginLogService = new LoginLogService(LoginLogModel);


export class LoginLogController extends Controller {
  /**
   * Create loginLog
   */
  async create(req: Request, res: Response) {
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
    return Created(res, { data: { loginLog: data }, message: "Created" });
  }

  /**
   * Return all loginLogs list
   */
  async getAll(req: Request | any, res: Response): Promise<any> {
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
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { loginLogs: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return loginLog Count
   */
  async getCount(req: Request, res: Response) {
    queryValidation(req.query);
    const { data, count, limit, offset, error } =
      await loginLogService.getCount(
        new Job({
          action: "getCount",
          options: {
            ...queryValidation(req.query),
          },
        })
      );
    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { loginLog: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return loginLogs By Id
   */
  async getById(req: Request, res: Response) {
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
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { loginLog: data },
      message: "Ok",
    });
  }

  /**
   * Return loginLog with parameter
   */
  async getOne(req: Request, res: Response) {
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
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { loginLog: data },
      message: "Ok",
    });
  }

  /**
   * Update loginLog
   */
  async update(req: Request, res: Response) {
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
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { loginLog: data },
      message: "Updated",
    });
  }

  /**
   * Delete loginLog
   */
  async deleteOne(req: Request, res: Response) {
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
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { loginLog: data },
      message: "Deleted",
    });
  }
}
