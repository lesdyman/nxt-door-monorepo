import 'dotenv/config';
import { json, urlencoded } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { toNodeHandler } from 'better-auth/node';
import { AppModule } from './app.module';
import { BETTER_AUTH } from './auth/auth';
import type { Auth } from './auth/auth';

async function bootstrap() {
  /*
   Nest's default bodyParser would consume the request stream before Better Auth's handler
   (mounted below) gets a chance to read it, leaving it with
  an empty body — so it's disabled here and re-applied manually after.
  */
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Built via BETTER_AUTH's factory provider (see app.module.ts) so it
  // shares Nest's own PrismaService instance instead of opening a second
  // Neon connection pool.
  const auth = app.get<Auth>(BETTER_AUTH);
  app.use('/api/auth/*splat', toNodeHandler(auth));

  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(
    `Application is running on: http://localhost:${port}`,
    'Bootstrap',
  );
}
bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
