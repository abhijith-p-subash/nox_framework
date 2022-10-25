import { ModelService } from "../core/modules/database/model.service";
import { Job } from "../core/utils/job";
// import User from "../models/database/user.model";

export class UserService extends ModelService {
  constructor(userModel: any) {
    super(userModel);
  }

}
