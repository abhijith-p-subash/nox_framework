import { PartialType } from '@nestjs/swagger';
import { Product } from '../entities/product.schema';

export class UpdateProductDto extends PartialType(Product) {}
