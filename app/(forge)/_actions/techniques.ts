"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getTechniqueById(techniqueId: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("techniques")
      .select()
      .eq("Id", techniqueId)
      .single();

    if (error) {
      throw new Error(
        `Failed to fetch technique with ID ${techniqueId}, ${error.details}`
      );
    }

    if (!data) {
      throw new Error(`Technique with ID ${techniqueId} not found.`);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch technique.");
  }
}

export async function getTechniques() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("techniques").select("*");

    if (error) {
      throw new Error(`Failed to fetch techniques ${error.details}`);
    }

    if (!data) {
      throw new Error(`Techniques not found.`);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch techniques.");
  }
}

export async function createTechnique() {}
