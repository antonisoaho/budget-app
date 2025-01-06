import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import connectDB from "@/lib/db";
import { AdapterUser } from "next-auth/adapters";
import { upsertUser, upsertAccount } from "@/services/user.services";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.userId = user.id;
        token.email = user.email;
      }
      if (user) {
        await connectDB();

        const existingUser = await upsertUser(user as AdapterUser);

        if (account) {
          await upsertAccount(account, existingUser._id.toString());
        }

        token.userId = existingUser._id.toString();
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user as AdapterUser;
        session.user.id = token.userId as string;
        session.user.email = token.email as string;
      }
      return session;
    },

    redirect() {
      return "/login";
    },
  },
});
