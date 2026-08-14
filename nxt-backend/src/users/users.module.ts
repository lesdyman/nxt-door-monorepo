import { Module } from '@nestjs/common';
import { UploadsModule } from '../uploads/uploads.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [UploadsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
