import { create } from "zustand";

interface SessionModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddSessionModal = create<SessionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddSessionModal;
