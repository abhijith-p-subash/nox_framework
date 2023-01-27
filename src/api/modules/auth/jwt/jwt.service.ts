import jwt from "jsonwebtoken";
import redisClient from "../../../../config/redis";
// import dotenv from "dotenv";

export class JWTService {
  async createToken(userId: number | string, expireTime: string, key?: string) {
    const payload = {
      userId: userId,
    };
    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    const options = {
      expiresIn: expireTime,
      issuer: process.env.PROJECT_NAME,
    };
    return jwt.sign(payload, key ?  `${secretKey}${key}` : `${secretKey}`, options);
  }

  async verifyToken(token: string, key?:string) {
    const decode = jwt.verify(token, key ? `${process.env.JWT_SECRET}${key}`:`${process.env.JWT_SECRET}`);

    console.log(decode);

    return decode;
  }

  async createRefreshToken(userId: number | string) {
    const payload = {
      userId: userId,
    };
    const secretKey = process.env.REFRESH_TOKEN_SECRET;

    const options = {
      expiresIn: "1y",
      issuer: process.env.PROJECT_NAME,
    };
    const refreshToken = jwt.sign(payload, `${secretKey}`, options);
    await redisClient.SET(`${userId}`, refreshToken);
    await redisClient.expire(`${userId} `, 31536000);
    return refreshToken;
  }
}
