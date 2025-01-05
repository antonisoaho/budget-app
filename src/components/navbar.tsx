import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="max-w-screen-7xl flex items-center justify-between flex-row-reverse px-6 py-4 position-fixed top-0 left-0 right-0 z-50">
      <Button
        type="submit"
        onClick={async () => {
          "use server";
          session ? await signOut() : redirect("/login");
        }}
      >
        {session ? "Log Out" : "Log In"}
      </Button>
      {session ? (
        <Avatar>
          <AvatarImage src={(session?.user?.image as string) || ""} />
          <AvatarFallback>
            {session?.user?.name?.charAt(0) ?? ""}
          </AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
};

export default Navbar;
