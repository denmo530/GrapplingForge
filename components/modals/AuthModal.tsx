import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";

import { Modal } from "./Modal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

export const AuthModal = () => {
  const { supabaseClient, session } = useSessionContext();
  const router = useRouter();

  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
      onClose();
    }
  }, [router, onClose, session]);

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={["google", "facebook", "apple"]}
        socialLayout="horizontal"
        magicLink
        redirectTo="http://localhost:3000/dashboard"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#A7C7E7",
                brandAccent: "#B6D0E2",
              },
            },
          },
        }}
      />
    </Modal>
  );
};
