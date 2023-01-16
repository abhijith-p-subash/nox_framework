import { Request, Response } from "express";
import { Result, Unauthorized } from "../../../core/utils/response";
import { AuthService } from "./auth.service";
import { JWTService } from "./jwt/jwt.service";

const authService = new AuthService();
const jwtService = new JWTService();

export class AuthController {
  async login(req: Request, res: Response) {
    console.log(req.user);
    let user: { id: number } | any = req.user;

    const { data, error } = await authService.createUserSession(user?.id);
    console.log("Login data", data);

    if (!!error) {
      return Unauthorized(res, {
        error,
        message: `${error || error}`,
      });
    }
    return Result(res, { data, message: "Login success" });
  }

  async signup() {
    return await jwtService.createToken(1, true);
  }

  async testSecurity(req: Request, res: Response) {
    return Result(res, { message: "Security OK..!" });
  }
}
