import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSessionContext } from "@supabase/auth-helpers-react";

import { Modal } from "../Modal";
import useAuthModal from "@/hooks/useAuthModal";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import RegisterForm from "./RegisterForm";

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
      title="Welcome to Grappling Forge 🔨"
      description=""
      isOpen={isOpen}
      onChange={onChange}
    >
      <Tabs defaultValue="login">
        <TabsList className="mb-2">
          <TabsTrigger value="login">Log in</TabsTrigger>
          <TabsTrigger value="signup">Create an Account</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
