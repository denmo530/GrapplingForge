"use client";

import React from "react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import useAuthModal from "@/hooks/useAuthModal";

export const Navbar = () => {
  const { onOpen } = useAuthModal();

  return (
    <div className="w-full py-6 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" onClick={onOpen}>
            Login
          </Button>
          <Button size="sm" onClick={onOpen}>
            Join the Forge
          </Button>
        </div>
      </div>
    </div>
  );
};
