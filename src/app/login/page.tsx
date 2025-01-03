import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { Computer, Github, Mail } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <MagicCard className="max-w-xl flex flex-col items-center justify-center h-72 bg-gray-200 rounded-lg gap-2">
        <h1 className="text-3xl font-bold">Login</h1>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button type="submit">
            <Mail />
            Login with Google
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("microsoft-entra-id");
          }}
        >
          <Button type="submit">
            <Computer />
            Login with Microsoft
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <Button type="submit">
            <Github />
            Login with Github
          </Button>
        </form>
      </MagicCard>
    </div>
  );
};

export default LoginPage;
