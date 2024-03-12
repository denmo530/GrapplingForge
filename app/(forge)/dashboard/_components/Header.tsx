import React from "react";
import { Logo } from "@/components/Logo";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavMenubar from "./NavMenubar";

export const Header = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userProfile, error } = await supabase
    .from("users")
    .select()
    .eq("id", user?.id)
    .single();

  return (
    <div className="border-b border-l-gray-200 py-4 bg-gray-50 w-screen">
      <div className="container mx-auto justify-between flex items-center">
        <Logo />
        <div className="flex flex-row gap-2 items-center">
          <Link href={"/dashboard"}>
            <Button
              className="bg-malibu-500 hover:bg-malibu-600"
              variant={"default"}
            >
              Dashboard
            </Button>
          </Link>
          <NavMenubar userProfile={userProfile} />
        </div>
      </div>
    </div>
  );
};
