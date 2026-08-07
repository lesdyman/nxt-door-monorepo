import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { expo } from '@better-auth/expo';
import type { PrismaClient } from '../generated/prisma/client';

export const BETTER_AUTH = Symbol('BETTER_AUTH');

export function createAuth(prisma: PrismaClient) {
  return betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    // The Expo app's own URL scheme (app.json) — needed so an OAuth
    // redirect back into the app (next_door://...) is accepted rather
    // than rejected as a foreign origin.
    trustedOrigins: ['next_door://'],
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
    user: {
      modelName: 'authUser',
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    plugins: [expo()],
  });
}

export type Auth = ReturnType<typeof createAuth>;
