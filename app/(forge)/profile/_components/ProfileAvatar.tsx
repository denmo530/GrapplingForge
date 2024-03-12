"use client";
import React, { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileAvatar = ({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) => {
  const supabase = createSupabaseClient();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);
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

    if (url) {
      downloadImage(url);
    } else {
      setLoading(false);
    }
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {loading ? (
        <>
          <Skeleton className="w-[200px] h-[200px] " />
        </>
      ) : (
        avatarUrl && (
          <div className={`relative w-[200px] h-[200px]`}>
            <Image
              className="absolute inset-0 w-full h-full rounded-sm object-cover"
              fill
              src={avatarUrl}
              alt="avatar"
            />
          </div>
        )
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className={`cursor-pointer hover:bg-gray-100 w-[${size}px]`}
      />
    </div>
  );
};

export default ProfileAvatar;
