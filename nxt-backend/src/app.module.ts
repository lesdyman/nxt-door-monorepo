import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './listings/listings.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [PrismaModule, ListingsModule, UploadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
