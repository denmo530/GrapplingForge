import React from "react";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { User } from "lucide-react";
export const Avatar = () => {
  const { userDetails, user } = useUser();
  const displayName = userDetails?.first_name || user?.email;
  return (
    <div className="flex gap-x-2">
      {userDetails?.avatar_url ? (
        <div className="rounded-full object-contain">
          <Image alt="Avatar" src={userDetails?.avatar_url} />
        </div>
      ) : (
        <User />
      )}
      <h1 className="text-md font-medium text-neutral-700">{displayName}</h1>
    </div>
  );
};
