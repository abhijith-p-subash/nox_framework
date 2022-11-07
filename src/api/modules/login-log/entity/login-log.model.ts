import { prop, getModelForClass } from "@typegoose/typegoose";

export class LoginLog {
  @prop({type: String})
  public name?: string;

  @prop({type: Number})
  public user_id?: number;
}

export const LoginLogModel = getModelForClass(LoginLog);
