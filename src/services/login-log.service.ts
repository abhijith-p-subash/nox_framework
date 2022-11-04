import { ModelService } from "../core/modules/mongo/model.service";

export class LoginLogService extends ModelService {
    constructor(loginLog:any){
        super(loginLog);
    }
}