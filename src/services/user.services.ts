import connectDB from "@/lib/db";
import UserModel from "@/models/schemas/User";
import AccountModel from "@/models/schemas/Account";
import { Account } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export async function upsertUser(user: AdapterUser) {
  await connectDB();
  return UserModel.findOneAndUpdate(
    { email: user.email },
    { email: user.email, name: user.name },
    { upsert: true, new: true }
  );
}

export async function upsertAccount(account: Account, userId: string) {
  await connectDB();
  return AccountModel.findOneAndUpdate(
    { providerAccountId: account.providerAccountId },
    {
      userId: userId,
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
