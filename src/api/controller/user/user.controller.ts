import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { queryValidation } from "./../../../core/utils/validation";
import { NotFoundError, ValidationError } from "./../../../core/utils/errors";
import { User } from "./../../../models/database/user.model";
import { Job } from "../../../core/utils/job";
import { UserService } from "./../../../services/user.service";
import {
  BadRequest,
  Created,
  ErrorResponse,
  NotFound,
  Result,
} from "../../../core/utils/response";
import { Get, Route, Post, Put, Delete } from "tsoa";
import { LoginLogModel } from "../../../models/mongo/login-log.model";

const userService = new UserService(User);

export class UserController {
  /**
   * Create User
   */
  async create(req: Request, res: Response) {
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
  }

  /**
   * Return all Users list
   */
  async getAll(req: Request, res: Response) {
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
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { user: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return User Count
   */
  async getCount(req: Request, res: Response) {
    queryValidation(req.query);
    const { data, count, limit, offset, error } = await userService.getCount(
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
      data: { user: data, count, limit, offset },
      message: "Ok",
    });
  }

  /**
   * Return Users By Id
   */
  async getById(req: Request, res: Response) {
    const { data, error } = await userService.findById(
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
      data: { user: data },
      message: "Ok",
    });
  }

  /**
   * Return User with parameter
   */
  async getOne(req: Request, res: Response) {
    const { data, error } = await userService.findOne(
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
      data: { user: data },
      message: "Ok",
    });
  }

  /**
   * Update User
   */
  async update(req: Request, res: Response) {
    const { data, error } = await userService.update(
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
      data: { user: data },
      message: "Updated",
    });
  }

  /**
   * Delete User
   */
  async deleteOne(req: Request, res: Response) {
    const { data, error } = await userService.delete(
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
      data: { user: data },
      message: "Deleted",
    });
  }
}

// export const create = async (req: Request, res: Response) => {
//   const { data, error } = await userService.create(
//     new Job({
//       action: "create",
//       body: {
//         uid: uuidv4(),
//         ...req.body,
//       },
//     })
//   );

//   if (!!error) {
//     if (error instanceof ValidationError) {
//       return BadRequest(res, {
//         error,
//         message: error.message,
//       });
//     }
//     return ErrorResponse(res, {
//       error,
//       message: `${error.message || error}`,
//     });
//   }
//   return Created(res, { data: { user: data }, message: "Created" });
// };

// export const getAll = async (req: Request, res: Response) => {
//   queryValidation(req.query);
//   const { data, count, limit, offset, error } = await userService.findAll(
//     new Job({
//       action: "findAll",
//       options: {
//         ...queryValidation(req.query),
//       },
//     })
//   );
//   if (!!error) {
//     return ErrorResponse(res, { error, message: `${error.message || error}` });
//   }
//   return Result(res, {
//     data: { user: data, count, limit, offset },
//     message: "Ok",
//   });
// };

// export const getCount = async (req: Request, res: Response) => {
//   queryValidation(req.query);
//   const { data, count, limit, offset, error } = await userService.getCount(
//     new Job({
//       action: "getCount",
//       options: {
//         ...queryValidation(req.query),
//       },
//     })
//   );
//   if (!!error) {
//     return ErrorResponse(res, { error, message: `${error.message || error}` });
//   }
//   return Result(res, {
//     data: { user: data, count, limit, offset },
//     message: "Ok",
//   });
// };

// export const getById = async (req: Request, res: Response) => {
//   const { data, error } = await userService.findById(
//     new Job({
//       action: "findById",
//       id: +req.params.id,
//       options: {
//         ...queryValidation(req.query),
//       },
//     })
//   );
//   if (!!error) {
//     if (error instanceof NotFoundError) {
//       return NotFound(res, {
//         error,
//         message: `Record Not found`,
//       });
//     }
//     return ErrorResponse(res, { error, message: `${error.message || error}` });
//   }
//   return Result(res, {
//     data: { user: data },
//     message: "Ok",
//   });
// };

// export const getOne = async (req: Request, res: Response) => {
//   const { data, error } = await userService.findOne(
//     new Job({
//       action: "findOne",
//       options: {
//         ...queryValidation(req.query),
//       },
//     })
//   );
//   if (!!error) {
//     if (error instanceof NotFoundError) {
//       return NotFound(res, {
//         error,
//         message: `Record Not found`,
//       });
//     }
//     return ErrorResponse(res, { error, message: `${error.message || error}` });
//   }
//   return Result(res, {
//     data: { user: data },
//     message: "Ok",
//   });
// };

// export const update = async (req: Request, res: Response) => {
//   const { data, error } = await userService.update(
//     new Job({
//       action: "update",
//       id: +req.params.id,
//       body: req.body,
//     })
//   );
//   if (!!error) {
//     if (error instanceof NotFoundError) {
//       return NotFound(res, {
//         error,
//         message: `Record Not found`,
//       });
//     }
//     return ErrorResponse(res, { error, message: `${error.message || error}` });
//   }
//   return Result(res, {
//     data: { user: data },
//     message: "Updated",
//   });
// };

// export const deleteOne = async (req: Request, res: Response) => {
//   const { data, error } = await userService.delete(
//     new Job({
//       action: "delete",
//       id: +req.params.id,
//       options: {
//         ...queryValidation(req.query),
//       },
//     })
//   );
//   if (!!error) {
//     if (error instanceof NotFoundError) {
//       return NotFound(res, {
//         error,
//         message: `Record Not found`,
//       });
//     }
//     return ErrorResponse(res, { error, message: `${error.message || error}` });
//   }
//   return Result(res, {
//     data: { user: data },
//     message: "Deleted",
//   });
// };
