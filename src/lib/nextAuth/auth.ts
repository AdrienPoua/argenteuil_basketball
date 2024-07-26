import GithubProvider from "next-auth/providers/github";
import NextAuth, { NextAuthOptions } from "next-auth";

const { GITHUB_ID, GITHUB_SECRET, ADMIN_GITHUB_EMAIL } = process.env;

if (!GITHUB_ID || !GITHUB_SECRET || !ADMIN_GITHUB_EMAIL) {
  throw new Error("GITHUB_ID and GITHUB_SECRET and ADMIN_GITHUB_EMAIL must be set");
}

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
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
