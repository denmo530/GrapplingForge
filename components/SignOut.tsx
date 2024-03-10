import React from "react";
import { Button } from "./ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const SignOut = () => {
  const logout = async () => {
    "use server";

    const supabase = await createSupabaseServerClient();

    await supabase.auth.signOut();

    redirect("/");
  };

  return (
    <form action={logout}>
      <Button variant={"ghost"}>Sign Out</Button>
    </form>
  );
};

export default SignOut;
