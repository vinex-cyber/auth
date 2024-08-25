"use client";
import { signIn } from "next-auth/react";
import { FcGoogle, FcGrid } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("google")}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      {/* <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}>
        <FaGithub className="w-5 h-5" />
      </Button> */}
    </div>
  );
};
