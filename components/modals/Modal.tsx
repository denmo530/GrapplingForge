import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogContent className=" border border-neutral-200 md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px]  rounded-md p-[25px] focus:outline-none">
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-semibold mb-4">
            {title}
          </DialogTitle>
          <DialogDescription className="mb-5 text-sm leading-normal text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
