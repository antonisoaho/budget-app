"use client";

import BoxReveal from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Computer, Github } from "lucide-react";
import React from "react";

const Login = ({
  handleLogin,
}: {
  handleLogin: (provider: string) => void;
}) => {
  return (
    <Card className="flex flex-col space-y-4 w-72 h-80 items-center">
      <CardHeader>Please choose provider</CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <BoxReveal
          width="100%"
          duration={0.3}
        >
          <Button
            className="flex space-between w-full"
            type="submit"
            onClick={() => handleLogin("google")}
          >
            <Mail className="mr-5" />
            Sign in with Google
          </Button>
        </BoxReveal>
        <BoxReveal
          width="100%"
          duration={0.5}
        >
          <Button
            className="flex space-between w-full"
            type="submit"
            onClick={() => handleLogin("microsoft-entra-id")}
          >
            <Computer className="mr-5" />
            Sign in with Microsoft
          </Button>
        </BoxReveal>
        <BoxReveal
          width="100%"
          duration={0.8}
        >
          <Button
            className="flex space-between w-full"
            type="submit"
            onClick={() => handleLogin("github")}
          >
            <Github className="mr-2" />
            Sign in with Github
          </Button>
        </BoxReveal>
      </CardContent>
    </Card>
  );
};

export default Login;
