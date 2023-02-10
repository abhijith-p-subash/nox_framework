import { Request, Response } from "express";
import { EmailService } from "../../../core/modules/email/email.service";
import { ValidationError } from "../../../core/utils/errors";
import { Job } from "../../../core/utils/job";
import {
  BadRequest,
  Created,
  ErrorResponse,
  Result,
  Unauthorized,
} from "../../../core/utils/response";
import { AuthService } from "./auth.service";
import { JWTService } from "./jwt/jwt.service";

const authService = new AuthService();
const jwtService = new JWTService();

export class AuthController {
  async signup(req: Request, res: Response) {
    console.log(req.body);
    const { data, error, verificationToken, message } =
      await authService.registerUser(
        new Job({
          body: {
            user: req.body,
            httpData: {
              protocol: req.protocol,
              host: req.headers.host,
              // toEmail: req.body.email
            },
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
    return Created(res, {
      data: { user: data, verificationToken },
      message: "Created and Verification Email send",
    });
  }

  async login(req: Request, res: Response) {
    let user: { id: number } | any = req.user;
    const { data, error } = await authService.createUserSession(
      new Job({
        id: user.id,
        body: req.user,
      })
    );
    if (!!error) {
      return Unauthorized(res, {
        error,
        message: `${error || error}`,
      });
    }
    return Result(res, { data, message: "Login success" });
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
