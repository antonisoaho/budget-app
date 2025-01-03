import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { notFound } from "next/navigation";

const HomePage = async () => {
  const session = await auth();
  if (!session) return notFound();
  return (
    <main>
      <MagicCard className="w-52 h-52 flex justify-center items-center">
        <h1>Hello {session.user?.name ?? "World"}</h1>
      </MagicCard>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Log Out</Button>
      </form>
    </main>
  );
};
export default HomePage;
