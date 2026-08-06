import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  // `User` already exists as the app's business-profile model (Int id, place/rating/etc).
  // Keep Better Auth's own identity table separate so it doesn't merge into it and
  // collide on id type (Better Auth uses string ids; `User.id` is an autoincrement Int).
  user: {
    modelName: 'authUser',
  },
});

export default auth;
