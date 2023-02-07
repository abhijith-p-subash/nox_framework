import { ModelService } from "../../../core/modules/mongo/model.service";

export class ProductService extends ModelService {
    constructor(product:any){
        super(product);
    }
}