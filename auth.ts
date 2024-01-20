import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/register",
    signOut: "/login",
  },
  callbacks: {
    // async jwt({ token, session }) {
    //   if (token.sub && session.user) {
    //     session.user.id = token.sub
    //   }
    //   console.log(session)
    //   return token;
    // },
    // async session({ token, session }) {
    //   if (token.sub && session.user) {
    //     session.user.id = token.sub;
    //   }
    //   return token;
    // },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
