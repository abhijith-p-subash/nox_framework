import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";

import { UserService } from "../user/user.service";
import { User } from "../user/entity/user.model";
import { Job } from "../../../core/utils/job";
import { queryValidation } from "../../../core/utils/validation";
import { NotFoundError } from "../../../core/utils/errors";
import { ErrorResponse, NotFound } from "../../../core/utils/response";
import { compareHash } from "../../../core/utils/helpers";

const LocalStrategy = passportLocal.Strategy,
  JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;

// const userService = new UserService(User);

export class AuthService {
  constructor(public userService = new UserService(User)) {}

 
}
