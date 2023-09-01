"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleGithubLogin() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      // display error message to user
      toast.error("Something went wrong with your login.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={handleGithubLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
