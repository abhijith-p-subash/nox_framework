import { Request, Response } from "express";
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
// import { Product, ProductGetAllResponse } from "./loginlog.type";
import { queryValidation } from "../../../core/utils/validation";
import { ProductModel, Product } from "./entity/login-log.model";
import { ProductService } from "./login-log.service";


const productService = new ProductService(ProductModel);


export class ProductController {
  /**
   * Create product
   */
  async create(req: Request, res: Response) {
    const { data, error } = await productService.create(
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
    return Created(res, { data: { product: data }, message: "Created" });
  }

  /**
   * Return all products list
   */
  async getAll(req: Request | any, res: Response): Promise<any> {
    queryValidation(req.query);
    const { data, count, limit, offset, error } = await productService.findAll(
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
      data: { products: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return product Count
   */
  async getCount(req: Request, res: Response) {
    queryValidation(req.query);
    const { data, count, limit, offset, error } =
      await productService.getCount(
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
      data: { product: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return products By Id
   */
  async getById(req: Request, res: Response) {
    const { data, error } = await productService.findById(
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
      data: { product: data },
      message: "Ok",
    });
  }

  /**
   * Return product with parameter
   */
  async getOne(req: Request, res: Response) {
    const { data, error } = await productService.findOne(
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
      data: { product: data },
      message: "Ok",
    });
  }

  /**
   * Update product
   */
  async update(req: Request, res: Response) {
    const { data, error } = await productService.update(
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
      data: { product: data },
      message: "Updated",
    });
  }

  /**
   * Delete product
   */
  async deleteOne(req: Request, res: Response) {
    const { data, error } = await productService.delete(
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
      data: { product: data },
      message: "Deleted",
    });
  }
}
