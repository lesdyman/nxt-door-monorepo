import { Module } from '@nestjs/common';
import { UploadsModule } from '../uploads/uploads.module';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';

@Module({
  imports: [UploadsModule],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
