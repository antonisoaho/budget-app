import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();

  if (session) {
    redirect(`/dashboard`);
  }

  return (
    <main>
      <Button
        type="submit"
        onClick={async () => {
          "use server";
          session ? await signOut() : redirect("/login");
        }}
      >
        {session ? "Log Out" : "Log In"}
      </Button>
    </main>
  );
};
export default HomePage;
