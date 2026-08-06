import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BETTER_AUTH, createAuth } from './auth/auth';
import { AuthGuard } from './auth/auth.guard';
import { ListingsModule } from './listings/listings.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { SavedListingsModule } from './saved-listings/saved-listings.module';

@Module({
  imports: [
    PrismaModule,
    ListingsModule,
    UploadsModule,
    UsersModule,
    PlacesModule,
    SavedListingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: BETTER_AUTH,
      useFactory: (prisma: PrismaService) => createAuth(prisma),
      inject: [PrismaService],
    },
  ],
  exports: [BETTER_AUTH],
})
export class AppModule {}
