import React from "react";
import { Logo } from "@/components/Logo";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserNav from "./UserNav";
import { getAvatar } from "@/app/(forge)/_actions/avatars";

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

  const avatar = await getAvatar(userProfile?.avatar_url);

  return (
    <div className="border-b border-l-gray-200 py-4 bg-gray-50 w-screen">
      <div className="container mx-auto justify-between flex items-center">
        <Logo />
        <div className="flex flex-row gap-4 items-center">
          <Link href={"/dashboard"}>
            <Button className="bg-malibu-500 hover:bg-malibu-500/90">
              Dashboard
            </Button>
          </Link>
          <Link
            href={"/training-session"}
            className="text-muted-foreground transition-colors hover:text-primary font-medium"
          >
            Training Log
          </Link>
          <UserNav userProfile={userProfile} avatar={avatar} />
        </div>
      </div>
    </div>
  );
};
