import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { queryValidation } from "./../../../core/utils/validation";
import { NotFoundError, ValidationError } from "./../../../core/utils/errors";
import { Good } from "./entity/good.model";
import { Job } from "../../../core/utils/job";
import { GoodService } from "./good.service";
import {
  BadRequest,
  Created,
  ErrorResponse,
  NotFound,
  Result,
} from "../../../core/utils/response";

const goodService = new GoodService(Good);

export class GoodController {
  // constructor(private goodService = new GoodService(Good)){

  // }
  /**
   * Create Good
   */
  async create(req: Request, res: Response) {
    const { data, error } = await goodService.create(
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
    return Created(res, { data: { good: data }, message: "Created" });
  }

  /**
   * Return all Goods list
   */
  async getAll(req: Request, res: Response) {
    const { data, count, limit, offset, error } = await goodService.findAll(
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
      data: { good: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return Good Count
   */
  async getCount(req: Request, res: Response) {
    queryValidation(req.query);
    const { data, count, limit, offset, error } = await goodService.getCount(
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
      data: { good: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return Goods By Id
   */
  async getById(req: Request, res: Response) {
    const { data, error } = await goodService.findById(
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
      data: { good: data },
      message: "Ok",
    });
  }

  /**
   * Return Good with parameter
   */
  async getOne(req: Request, res: Response) {
    const { data, error } = await goodService.findOne(
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
      data: { good: data },
      message: "Ok",
    });
  }

  /**
   * Update Good
   */
  async update(req: Request, res: Response) {
    const { data, error } = await goodService.update(
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
      data: { good: data },
      message: "Updated",
    });
  }

  /**
   * Delete Good
   */
  async deleteOne(req: Request, res: Response) {
    const { data, error } = await goodService.delete(
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
      data: { good: data },
      message: "Deleted",
    });
  }
}
