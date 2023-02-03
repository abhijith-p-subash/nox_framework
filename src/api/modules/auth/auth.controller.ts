import { Request, Response } from "express";
import { EmailService } from "../../../core/modules/email/email.service";
import { Job } from "../../../core/utils/job";
import {
  ErrorResponse,
  Result,
  Unauthorized,
} from "../../../core/utils/response";
import { AuthService } from "./auth.service";
import { JWTService } from "./jwt/jwt.service";

const authService = new AuthService();
const jwtService = new JWTService();

export class AuthController {
  async login(req: Request, res: Response) {
    let user: { id: number } | any = req.user;
    const { data, error } = await authService.createUserSession(user?.id);
    if (!!error) {
      return Unauthorized(res, {
        error,
        message: `${error || error}`,
      });
    }
    return Result(res, { data, message: "Login success" });
  }
  async signup() {
    return await jwtService.createToken(1, "1h");
  }

  async sendVerificationEmail(req: Request, res: Response) {
    const job = new Job({
      id: req.params.id,
      body: {
        protocol: req.protocol,
        host: req.headers.host,
        toEmail: req.body.toEmail,
      },
    });
    const { data, message, error } = await authService.sendVerificationEmail(
      job
    );
    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: message || `${error}`,
      });
    }
    return Result(res, {
      data: { emailRes: data },
      message: message || "Ok",
    });
  }

  async emailVerification(req: Request, res: Response) {
    const { data, error } = await authService.emailVerification(
      new Job({
        action: "emailVerification",
        body: {
          token: req.params.token,
          otp: req.query.otp,
        },
      })
    );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error}` || "Failed to verify",
      });
    }
    return Result(res, {
      data: { verificationRes: data },
      message: "User Verified",
    });
  }

  async logout(req: Request, res: Response) {
    // req.logOut();
    res.redirect("/");
  }

  async testSecurity(req: Request, res: Response) {
    return Result(res, { message: "Security OK..!" });
  }
}
