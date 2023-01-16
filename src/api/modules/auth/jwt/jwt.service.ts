import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

export class JWTService {
  async createToken(userId: number | string, access_token: boolean) {
    console.log(process.env.PROJECT_NAME);
    const payload = {
      userId: userId,
    };
    const secretKey = access_token
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1h",
      issuer: process.env.PROJECT_NAME,
    };
    return jwt.sign(payload, `${secretKey}`, options);
  }

  async verifyToken(token: string) {
    const decode = jwt.verify(token, `${process.env.JWT_SECRET}`);
    return decode;
  }
}
