import { Job } from "../../../core/utils/job";
import { User } from "../user/entity/user.model";
import { UserService } from "../user/user.service";
import { JWTService } from "./jwt/jwt.service";

const userService = new UserService(User);
const jwtService = new JWTService();

export class AuthService {
  async createSession() {}

  async createUserSession(userId: number | string) {
    try {
      console.log("user id ", userId, typeof userId);
      console.log("user id ", +userId, typeof +userId);
      
      const { data, error } = await userService.findById(
        new Job({
          action: "findById",
          id: +userId,
        })
      );

      console.log("SERVICE DATA", data);
      console.log("ERROR", error);
      
      

      if (!!error) {
        return { error: "Account does not exist" };
      } else {
        // if (!data.active) {
        //   return { error: "Account is inactive" };
        // }
        const token = await jwtService.createToken(userId, true);
        console.log("Token", token);

        return {
          error: false,
          data: { token, user: data },
        };
      }
    } catch (error) {
      console.log("???????????? cate erorr");
      
      return { error };
    }
  }
}
