"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAvatar(path: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);

    if (error) {
      throw error;
    }

    const newUrl = URL.createObjectURL(data);

    return newUrl;
  } catch (error) {
    console.log("Error downloading image: ", error);
  }
}
