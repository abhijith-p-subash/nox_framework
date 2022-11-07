import { ModelService } from "../../../core/modules/database/model.service";


export class UserService extends ModelService {
  constructor(userModel: any) {
    super(userModel);
  }

}
