import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email || !session?.user?.id || !session?.user?.name) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
  };
}
