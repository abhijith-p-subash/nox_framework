import { JwtPayload } from "jsonwebtoken";
import { EmailService } from "../../../core/modules/email/email.service";
import { Job } from "../../../core/utils/job";
import { LoginLogModel } from "../login-log/entity/login-log.model";
import { LoginLogService } from "../login-log/login-log.service";
import { User } from "../user/entity/user.model";
import { UserService } from "../user/user.service";
import { JWTService } from "./jwt/jwt.service";

const userService = new UserService(User);
const loginLogService = new LoginLogService(LoginLogModel);
const jwtService = new JWTService();
const emailService = new EmailService();

export class AuthService {
  async createSession() {}

  async createUserSession(job:Job) {
    console.log(">>>JOB");
    
    console.log(job);
    
    const id: { id: number } | any = job.id;
    const jobBody = (job as { body: any }).body;
    const { data, error } = await userService.findById(
      new Job({
        action: "findById",
        id: +id,
      })
    );
    if (!!error) {
      return { error: "Account does not exist" };
    } else {
      if (!data.active) {
        return { error: "Account is inactive" };
      }
      const token = await jwtService.createToken(id, "1h");
      const refreshToken = await jwtService.createRefreshToken(id);

      const loginLogs = await loginLogService.create(new Job({
        action: "create",
        body: {
          name: jobBody.full_name,
          user_id: +id
        }
      }))

      if (loginLogs.error) return {error: true, message: "Failed to register Login Logs"}
      
      return {
        error: false,
        data: { token, refreshToken, user: data },
      };
    }
  }

  async sendVerificationEmail(job: Job) {
    try {
      const OTP = Math.floor(100000 + Math.random() * 90000),
        verificationToken = await jwtService.createToken(
          job.id || "",
          "10m",
          `${OTP}`
        ),
        protocol = job.body?.protocol,
        host = job.body?.host,
        verificationLink = `${protocol}://${host}/auth/email-verification/${verificationToken}`,
        htmlBody = `<h1>OTP:${OTP}  </h1><br><p>${verificationLink}</p>`,
        emailJob = new Job({
          action: "sendMail",
          payload: {
            toEmail: job.body?.toEmail,
          },
          body: {
            subject: "NEW EMAIL TESTING SUBJECT",
            OTP: OTP,
            link: verificationLink,
            toEmail: job.body?.toEmail,
            htmlBody,
          },
        });
      const { data, message, error } = await emailService.sendMail(emailJob);
      if (error) {
        return { error: error, status: 404, message: "Failed to send email" };
      }
      return {
        data: { ...data, verificationToken },
        verificationToken,
        message,
      };
    } catch (error) {
      return { error: error, status: 404, message: "Failed to send email" };
    }
  }

  async emailVerification(job: Job) {
    try {
      let jwtPayLoad = await jwtService.verifyToken(
        job.body?.token,
        job.body?.otp
      );
      let tokenVerifi = jwtPayLoad as JwtPayload;
      const { data, error } = await userService.update(
        new Job({
          action: "update",
          id: tokenVerifi.userId,
          body: {
            active: true,
          },
        })
      );

      if (error) {
        return error;
      }
      return { data };
    } catch (error) {
      return { error };
    }
  }
}