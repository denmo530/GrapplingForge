"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getDrillingRecordById(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("drilling_record")
      .select("*")
      .eq("id", id);

    if (error) throw error;

    if (!data) {
      throw new Error(`Drilling records not found.`);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
