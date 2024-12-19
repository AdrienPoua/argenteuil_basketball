"use server";
import GithubProvider from "next-auth/providers/github";
import NextAuth, { NextAuthOptions } from "next-auth";
import { z } from "zod";

const { GITHUB_ID, GITHUB_SECRET, ADMIN_GITHUB_EMAIL } = process.env;


const envSchema = z.object({
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  ADMIN_GITHUB_EMAIL: z.string().email(),
});

const env = envSchema.parse({
  GITHUB_ID,
  GITHUB_SECRET,
  ADMIN_GITHUB_EMAIL,
});

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile?.email === ADMIN_GITHUB_EMAIL;
    },
    async redirect() {
      return "/admin";
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
