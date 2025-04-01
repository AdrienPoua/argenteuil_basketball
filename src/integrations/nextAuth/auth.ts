import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
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
  throw new Error('Missing environment variables');
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Email/Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        try {
          if (user?.email === credentials.email && user?.hashedPassword === credentials.password) {
            return {
              id: 'admin',
              email: credentials.email,
              name: 'Administrateur',
            };
          }
          return null;
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      },
    }),
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
    async signIn({ user, account, profile }) {
      // Si l'authentification est faite via credentials, on accepte toujours
      if (account?.provider === 'credentials') {
        return true;
      }
      // Pour les OAuth providers, on vérifie l'email admin
      return profile?.email === ADMIN_GITHUB_EMAIL || profile?.email === ADMIN_GOOGLE_EMAIL;
    },

    async redirect({ url, baseUrl }) {
      return  `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      // Ajoute les informations du token au session object
      if (token && session.user) {
        (session.user as any).id = token.sub as string;
      }
      return session;
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
  // Configuration des pages personnalisées
  pages: {
    signOut: '/', // Redirection vers la page d'accueil après déconnexion
  },
};

const handler = NextAuth(authOptions);

export default handler;
