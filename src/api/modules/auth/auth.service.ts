import { Job } from "../../../core/utils/job";
import { User } from "../user/entity/user.model";
import { UserService } from "../user/user.service";
import { JWTService } from "./jwt/jwt.service";


const userService = new UserService(User);
const jwtService = new JWTService();

export class AuthService {
  async createSession() {}

  async createUserSession(userId: number | string) {
      const { data, error } = await userService.findById(
        new Job({
          action: "findById",
          id: +userId,
        })
      );
      if (!!error) {
        return { error: "Account does not exist" };
      } else {
        if (!data.active) {
          return { error: "Account is inactive" };
        }
        const token = await jwtService.createToken(userId, '1h');
        const refreshToken = await jwtService.createRefreshToken(userId);
        return {
          error: false,
          data: { token, refreshToken, user: data },
        };
      }
  }
}
