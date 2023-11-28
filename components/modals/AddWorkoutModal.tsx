import React, { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { Modal } from "./Modal";
import useAddWorkoutModal from "@/hooks/useAddWorkoutModal";
import { WorkoutForm } from "../WorkoutForm";

export const AddWorkoutModal = () => {
  const { isOpen, onClose, onOpen } = useAddWorkoutModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const { register, handleSubmit, reset } = useForm<FieldValues>({
  //     defaultValues: {
  //       date: null,
  //       duration: null,
  //       intensity: null,
  //       martialArtsTechniques: [],
  //       strengthExercises: [],
  //     },
  //   });

  const onChange = (open: boolean) => {
    if (!open) {
      //   reset();
      onClose();
    }
  };

  //   const onSubmit: SubmitHandler<FieldValues> = async (values) => {
  //     // add to supabase
  //   };

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
