"use client";

import React, { useEffect, useState } from "react";

import { AuthModal } from "@/app/(auth)/auth/components/AuthModal";
import { AddSessionModal } from "@/app/(forge)/training-session/_components/AddSessionModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddSessionModal />
      <AuthModal />
    </>
  );
};

export default ModalProvider;
