import { PartialType } from '@nestjs/swagger';
import { Good } from '../entities/good.entity';

export class UpdateGoodDto extends PartialType(Good) {}