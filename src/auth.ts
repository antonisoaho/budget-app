import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import AccountModel from "@/models/Account";
import { AdapterUser } from "next-auth/adapters";

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
      console.log("JWT callback - token:", token);
      console.log("JWT callback - user:", user);
      console.log("JWT callback - account:", account);

      if (account && user) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }

      if (user) {
        await connectDB();

        const existingUser = await UserModel.findOneAndUpdate(
          { email: user.email },
          { email: user.email, name: user.name },
          { upsert: true, new: true }
        );

        if (account) {
          await AccountModel.findOneAndUpdate(
            { providerAccountId: account.providerAccountId },
            {
              userId: existingUser._id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
            { upsert: true, new: true }
          );
        }
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user as AdapterUser;
      }
      return session;
    },

    redirect() {
      return "/login";
    },
  },
});
