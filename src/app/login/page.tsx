import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const LoginPage = () => {
  return (
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
  );
};

export default LoginPage;
