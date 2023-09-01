"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, GithubIcon } from "lucide-react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loginWithGithub() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong with your login.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col max-w-md items-center space-y-8">
        <div className="flex flex-col items-center gap-8">
          logo
          <h2 className="mt-6 tet-center text-3xl font-bod tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Button onClick={loginWithGithub} className="max-w-sm w-full mx-auto">
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <GithubIcon className="h-4 w-4 mr-2 " />
          )}{" "}
          Google login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
