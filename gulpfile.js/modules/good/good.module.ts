import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoodService } from './good.service';
import { GoodController } from './good.controller';
import { Good } from './entities/good.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Good]), MsClientModule],
  controllers: [GoodController],
  providers: [GoodService],
})
export class GoodModule {}
