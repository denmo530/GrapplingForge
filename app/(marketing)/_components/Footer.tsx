import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 border-t border-gray-200 p-4 bg-gray-50 w-full">
      <div className="container flex sm:flex-row flex-col items-center justify-between">
        <Logo />
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button size="sm" variant="link">
            Privacy Policy
          </Button>
          <Button size="sm" variant="link">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
