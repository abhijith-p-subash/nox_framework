import { ModelService } from "../core/modules/database/model.service";
// import User from "../models/database/user.model";

export class UserService extends ModelService {
  constructor(userModel: any) {
    super(userModel);
  }
}
