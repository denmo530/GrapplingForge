"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserMetadata } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import SignOut from "@/components/inputs/SignOut";
import Link from "next/link";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Skeleton } from "./ui/skeleton";

const UserNav = ({
  userProfile,
  avatar,
}: {
  userProfile: UserMetadata;
  avatar: string | undefined;
}) => {
  const [firstname, lastname] = userProfile?.full_name.split(" ") || [
    "John",
    "Doe",
  ];

  const initials =
    firstname && lastname ? `${firstname[0]}${lastname[0]}` : "Profile";

  const supabase = createSupabaseClient();

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    userProfile?.avatar_url
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);

        if (error) {
          throw error;
        }

        const newUrl = URL.createObjectURL(data);
        setAvatarUrl(newUrl);
      } catch (error) {
        console.log("Error downloading image: ", error);
      } finally {
        setLoading(false); // Set loading to false when image is loaded
      }
    }

    if (userProfile?.avatar_url) {
      downloadImage(userProfile?.avatar_url);
    } else {
      setLoading(false);
    }
  }, [userProfile, supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-sm ">
          {loading ? (
            <Skeleton className="w-8 h-8 rounded-sm" />
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl} alt="avatar image" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 my-1" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userProfile?.full_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userProfile?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
              <DropdownMenuShortcut className="text-md">
                <FaUser />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <SignOut />
          <DropdownMenuShortcut className="text-md">
            <FaSignOutAlt />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
