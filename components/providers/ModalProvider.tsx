"use client";

import React, { useEffect, useState } from "react";

import { AuthModal } from "../modals/AuthModal";
import { AddWorkoutModal } from "../modals/AddWorkoutModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <AddWorkoutModal />
    </>
  );
};

export default ModalProvider;
