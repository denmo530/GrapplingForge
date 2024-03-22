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
      <DialogContent className=" border border-neutral-200 md:h-auto w-full md:w-[90vw]  rounded-md p-[25px] focus:outline-none">
        <DialogHeader>
          <DialogTitle className="text-2xl text-left font-semibold mb-4">
            {title}
          </DialogTitle>
          <DialogDescription className="mb-5 text-sm leading-normal text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
