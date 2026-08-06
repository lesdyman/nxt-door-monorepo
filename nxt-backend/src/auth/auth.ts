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
    // TODO(unresolved): password reset is broken — /api/auth/request-password-reset
    // currently 400s with RESET_PASSWORD_DISABLED. Needs a `sendResetPassword`
    // callback backed by a real transactional email provider (none wired up yet,
    // same blocker as email verification). See API.md's Authentication section.
  },
  /* `User` already exists as the app's business-profile model (place/rating/etc,
  id shared 1:1 with authUser.id). Keep Better Auth's own identity table
  separate so schema generation doesn't merge into it.*/
  user: {
    modelName: 'authUser',
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});

export default auth;
