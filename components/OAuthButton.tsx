"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import React from "react";
import { Provider } from "@supabase/supabase-js";

interface OAuthButtonProps {
  provider: Provider;
  icon: React.ReactNode;
}

const OAuthButton = ({ provider, icon }: OAuthButtonProps) => {
  const supabase = createSupabaseClient();

  const loginWithProvider = () => {
    supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback/`,
      },
    });
  };

  return (
    <Button variant={"outline"} onClick={loginWithProvider}>
      {icon}
      <div className="w-full text-center">
        {provider.charAt(0).toUpperCase()}
        {provider.slice(1)}
      </div>
    </Button>
  );
};

export default OAuthButton;
