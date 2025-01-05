import { signIn } from "@/auth";
import Login from "@/components/login/Login";

const LoginPage = () => {
  const handleLogin = async (provider: string) => {
    "use server";
    await signIn(provider);
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center max-h-screen w-full h-full">
      <Login handleLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
