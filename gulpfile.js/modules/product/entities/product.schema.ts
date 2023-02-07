import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ParentSchema } from '../../../core/modules/mongo/parent-schema';

export type ProductDocument = Product & Document;

@Schema({
  collection: 'products',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Product extends ParentSchema {
  @Prop()
  @ApiProperty({
    description: 'Name',
    example: 'Test',
  })
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
