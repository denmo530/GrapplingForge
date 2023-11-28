import React from "react";
import { useForm } from "react-hook-form";

import { Modal } from "./Modal";
import useAddWorkoutModal from "@/hooks/useAddWorkoutModal";
import { WorkoutForm } from "../WorkoutForm";

export const AddWorkoutModal = () => {
  const { reset } = useForm();
  const { isOpen, onClose } = useAddWorkoutModal();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  return (
    <Modal
      title="Add a new Workout"
      description="Fill out your workout details"
      isOpen={isOpen}
      onChange={onChange}
    >
      <WorkoutForm />
    </Modal>
  );
};
