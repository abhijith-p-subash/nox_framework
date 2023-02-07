import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Table, Column, Index } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Good extends Entity<Good> {
  @Index
  @Column
  @ApiProperty({
    description: 'Good Name',
    example: 'Good Demo',
  })
  @IsString()
  name: string;
}
