import nodemailer from "nodemailer";
import { Job } from "../../utils/job";
import dotenv from 'dotenv';

dotenv.config();
export class EmailService {
  transporter = nodemailer.createTransport({
    host:"abhijithpsubash110@gmail.com",
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

  async sendMail(job:Job) {
    console.log(job);
    
    console.log( typeof process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);

    try {
      let info = await this.transporter.sendMail({
        from: "abhijithpsubash110@gmail.com",
        to: "abhijith.p.subash@gmail.com",
        subject: "Email  Testing",
        text: "Hello world",
        html: "<h1> Hello World HTML 😡😊  </h1><br><h1>ok ENV</h1>",
      });

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log("ERROR😡😡😡", error);
    }
  }
}
