import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../../core/modules/mongo/model.service';
import { Product, ProductDocument } from './entities/product.schema';

@Injectable()
export class ProductService extends ModelService {
  constructor(@InjectModel(Product.name) model: Model<ProductDocument>) {
    super(model);
  }
}
