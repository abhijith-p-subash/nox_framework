import { prop, getModelForClass } from "@typegoose/typegoose";

export class Product {
  @prop({type: String})
  public name?: string;
}

export const LoginLogModel = getModelForClass(Product);
