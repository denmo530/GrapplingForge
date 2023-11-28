import React from "react";
import { create } from "zustand";

interface AddWorkoutModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddWorkoutModal = create<AddWorkoutModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddWorkoutModal;
