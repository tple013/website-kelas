import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials?.email || !credentials?.password) return null;
        if (!adminEmail || !adminPassword) return null;

        if (
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return {
            id: "admin",
            name: "Administrator",
            email: adminEmail,
            role: "admin"
          } as any;
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || "user";
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = (token as any).role || "user";
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});