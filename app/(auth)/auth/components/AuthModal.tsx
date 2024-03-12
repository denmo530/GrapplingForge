import React from "react";

import { Modal } from "../../../../components/modals/Modal";
import useAuthModal from "@/hooks/useAuthModal";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import RegisterForm from "./RegisterForm";

export const AuthModal = () => {
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome to GrapplingForge 🔨"
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
          <LoginForm onClose={onClose} />
        </TabsContent>
        <TabsContent value="signup">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
