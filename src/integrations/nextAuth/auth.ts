import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/database/prisma';

const { GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ADMIN_GITHUB_EMAIL, ADMIN_GOOGLE_EMAIL } =
  process.env;

if (
  !GITHUB_ID ||
  !GITHUB_SECRET ||
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET ||
  !ADMIN_GITHUB_EMAIL ||
  !ADMIN_GOOGLE_EMAIL
) {
  throw new Error('Missing environment variables for nextAuth');
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile?.email === ADMIN_GITHUB_EMAIL || profile?.email === ADMIN_GOOGLE_EMAIL;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(`${baseUrl}/dashboard`)) {
        return baseUrl;
      }
      return '/dashboard';
    },
  },
  events: {
    async signIn(message) {
      console.log('User signed in:', message);
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export default handler;
