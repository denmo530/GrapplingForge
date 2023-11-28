"use client";

import useAddWorkoutModal from "@/hooks/useAddWorkoutModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { PlusSquare } from "lucide-react";
import React from "react";

const DashboardPage = () => {
  const currentDate = new Date().toDateString();
  const authModal = useAuthModal();
  const addWorkoutModal = useAddWorkoutModal();
  const { user } = useUser();

  const handleAddWorkout = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // TODO: Check for subscription

    return addWorkoutModal.onOpen();
  };

  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex flex-col justify-center w-full">
        <h3 className="text-md text-neutral-700 uppercase">{currentDate}</h3>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl md:text-6xl text-center mb-6 font-semibold text-neutral-800">
            Dashboard
          </h1>
          <div className="text-sm flex gap-x-2 items-center">
            Add workout
            <PlusSquare className="h-8 w-8" onClick={handleAddWorkout} />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl md:text-2xl mb-3 font-medium text-neutral-800">
          Activity
        </h2>
      </div>
    </div>
  );
};

export default DashboardPage;
