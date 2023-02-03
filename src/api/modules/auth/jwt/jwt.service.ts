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
    console.log("CRETAE TOKEN");
    console.log(key ?  `${secretKey}${key}` : `${secretKey}`);
    
    
    return jwt.sign(payload, key ?  `${secretKey}${key}` : `${secretKey}`, options);
  }

  async verifyToken(token: string, key?:string) {
    console.log(token);
    console.log(key);
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const test = key ? `${process.env.ACCESS_TOKEN_SECRET}${key}`:`${process.env.ACCESS_TOKEN_SECRET}`;
    console.log(test);
    
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    
    
    
    const decode = jwt.verify(token, key ? `${process.env.ACCESS_TOKEN_SECRET}${key}`:`${process.env.ACCESS_TOKEN_SECRET}`);

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
