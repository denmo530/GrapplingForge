"use client";

import React from "react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import useAuthModal from "@/hooks/useAuthModal";

export const Navbar = () => {
  const { onOpen } = useAuthModal();

  return (
    <div className="w-full py-4 px-4 border-b border-malibu-100 shadow-sm bg-white flex items-center">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button
            className="text-primary font-medium"
            size="sm"
            variant="ghost"
            onClick={onOpen}
          >
            Login
          </Button>
          <Button
            size="sm"
            onClick={onOpen}
            className="bg-malibu-500 hover:bg-malibu-500/90"
          >
            Join the Forge
          </Button>
        </div>
      </div>
    </div>
  );
};
