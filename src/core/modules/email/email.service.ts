import nodemailer from "nodemailer";
import { Job } from "../../utils/job";
import dotenv from "dotenv";

dotenv.config();
export class EmailService {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 25,
    service: "gmail",
    secure: false,
    auth: {
      // user: "abhijithpsubash110@gmail.com",
      // pass: "rahwaqxxoxnyfmkg"
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendMail(job: Job) {
    try {
      let info = await this.transporter.sendMail({
        from: process.env.EMAIL_HOST,
        to: job.body?.toEmail,
        subject: job.body?.subject,
        html: job.body?.htmlBody,
      });
      return {
        data: info,
        message: "Email Send",
      };
    } catch (error) {
      console.log("ERROR😡😡😡", error);
      return { error };
    }
  }
}
