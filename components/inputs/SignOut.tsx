import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/app/(auth)/auth/actions/auth-server-actions";

const SignOut = () => {
  return (
    <form action={logout}>
      <Button variant={"ghost"}>Sign Out</Button>
    </form>
  );
};

export default SignOut;
