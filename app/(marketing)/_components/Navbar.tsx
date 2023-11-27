"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { Database } from "@/types_db";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Avatar } from "./Avatar";
import toast from "react-hot-toast";

export const Navbar = () => {
  const { onOpen } = useAuthModal();
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = createClientComponentClient<Database>();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out.");
    }
  };

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          {user ? (
            <div className="flex gap-x-2 items-center justify-between w-full">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-6 w-6 text-neutral-700" />
              </Button>
              <Avatar />
            </div>
          ) : (
            <>
              <Button size="sm" variant="outline" onClick={onOpen}>
                Login
              </Button>
              <Button size="sm" onClick={onOpen}>
                Join the Forge
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
