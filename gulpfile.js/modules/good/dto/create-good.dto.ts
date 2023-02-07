import { OmitType } from '@nestjs/swagger';
import { Good } from '../entities/good.entity';

export class CreateGoodDto extends OmitType(Good, ['active'] as const) {}
