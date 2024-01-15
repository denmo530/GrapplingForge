import useAddWorkoutModal from "@/hooks/useAddWorkoutModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import React from "react";
import { Activity } from "lucide-react";
import { ActivityCard } from "./ActivityCard";
import { GoalProgressionCard } from "./GoalProgressionCard";

export const Overview = () => {
  const currentDate = new Date().toDateString();
  const authModal = useAuthModal();
  const addWorkoutModal = useAddWorkoutModal();
  const { user, userDetails } = useUser();

  const handleAddWorkout = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // TODO: Check for subscription

    return addWorkoutModal.onOpen();
  };
  return (
    <>
      <div className="flex flex-col justify-center w-full ">
        <h3 className="text-md text-neutral-700 uppercase">{currentDate}</h3>
        <h1 className="text-xl md:text-3xl  mb-6 font-semibold text-neutral-800">
          Welcome back 👋{" "}
          <span className="text-sky-600">
            {userDetails?.first_name || user?.email}!
          </span>
        </h1>
      </div>
      <div className="flex gap-4">
        <ActivityCard />
        <GoalProgressionCard />
      </div>
    </>
  );
};
