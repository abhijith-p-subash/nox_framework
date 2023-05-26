import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { queryValidation } from "./../../../core/utils/validation";
import { NotFoundError, ValidationError } from "./../../../core/utils/errors";
import { Role } from "./entity/role.model";
import { Job } from "../../../core/utils/job";
import { RoleService } from "./role.service";
import {
  BadRequest,
  Created,
  ErrorResponse,
  NotFound,
  Result,
} from "../../../core/utils/response";

const roleService = new RoleService(Role);

export class RoleController {
  // constructor(private roleService = new RoleService(Role)){

  // }
  /**
   * Create Role
   */
  async create(req: Request, res: Response) {
    const { data, error } = await roleService.create(
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
    return Created(res, { data: { role: data }, message: "Created" });
  }

  /**
   * Return all Roles list
   */
  async getAll(req: Request, res: Response) {
    const { data, count, limit, offset, error } = await roleService.findAll(
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
      data: { role: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return Role Count
   */
  async getCount(req: Request, res: Response) {
    queryValidation(req.query);
    const { data, count, limit, offset, error } = await roleService.getCount(
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
      data: { role: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return Roles By Id
   */
  async getById(req: Request, res: Response) {
    const { data, error } = await roleService.findById(
      new Job({
        action: "findById",
        id: +req.params.id,
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
      data: { role: data },
      message: "Ok",
    });
  }

  /**
   * Return Role with parameter
   */
  async getOne(req: Request, res: Response) {
    const { data, error } = await roleService.findOne(
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
      data: { role: data },
      message: "Ok",
    });
  }

  /**
   * Update Role
   */
  async update(req: Request, res: Response) {
    const { data, error } = await roleService.update(
      new Job({
        action: "update",
        id: +req.params.id,
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
      data: { role: data },
      message: "Updated",
    });
  }

  /**
   * Delete Role
   */
  async deleteOne(req: Request, res: Response) {
    const { data, error } = await roleService.delete(
      new Job({
        action: "delete",
        id: +req.params.id,
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
      data: { role: data },
      message: "Deleted",
    });
  }
}
