import { OmitType } from '@nestjs/swagger';
import { Product } from '../entities/product.schema';

export class CreateProductDto extends OmitType(Product, ['active'] as const) {}
