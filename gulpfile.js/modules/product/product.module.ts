import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './entities/product.schema';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MsClientModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
