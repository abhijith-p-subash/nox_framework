import { Request, Response } from "express";
import { EmailService } from "../../../core/modules/email/email.service";
import { Job } from "../../../core/utils/job";
import { Result, Unauthorized } from "../../../core/utils/response";
import { AuthService } from "./auth.service";
import { JWTService } from "./jwt/jwt.service";

const authService = new AuthService();
const jwtService = new JWTService();
const emailService = new EmailService();

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
    let rand = Math.floor(Math.random() * 100 + 54);
    let host = req.get("host");
    let link = "http://" + req.get("host") + "/verify?id=" + rand;
    const job = new Job({
      action: "sendMail",
      payload: {
        email: data?.user.email,
        link: link
      },
      body: {
        subject: "NEW EMAIL TESTING SUBJECT",
        message: "Hi, myname is Abhijith"
      }
    })
    console.log(link);
    await emailService.sendMail(job);
    return Result(res, { data, message: "Login success" });
  }

  async signup() {
    return await jwtService.createToken(1, '1h');
  }

  async logout(req: Request, res: Response) {
    // req.logOut();
    res.redirect("/");
  }

  async testSecurity(req: Request, res: Response) {
    return Result(res, { message: "Security OK..!" });
  }
}
