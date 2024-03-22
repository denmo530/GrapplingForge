"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

const ITEMS_PER_PAGE = 6;
export async function getTrainingSessions(query: string, currentPage: number) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    let baseQuery = supabase
      .from("training_session")
      .select("*", { count: "exact" })
      .eq("user_id", user?.id)
      .order("date", { ascending: false });

    if (query) {
      const trimmedQuery = query.trim();

      // Split the trimmed query into words
      const words = trimmedQuery.split(" ");

      let ftsQuery;

      // If there is only one word, use it as is
      if (words.length === 1) {
        ftsQuery = words[0];
      } else {
        // If there are multiple words, join them with "&"
        ftsQuery = words.join(" & ");
      }
      // const ftsQuery = query.split(" ").join(" & ");
      baseQuery = baseQuery.or(
        `details.fts.${ftsQuery}, intensity.fts.${ftsQuery}, session_type.fts.${ftsQuery}`
      );
    }

    const { data, count, error } = await baseQuery.range(
      offset,
      offset + ITEMS_PER_PAGE - 1
    );

    if (error) throw error;

    if (!data) {
      throw new Error(`Techniques not found.`);
    }

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);

    return { data, totalPages };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch training session data.");
  }
}

export async function getTrainingSessionById(sessionId: string) {
  if (!sessionId) throw new Error("No training session ID provided.");

  const supabase = await createSupabaseServerClient();
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw new Error("Failed to authenticate user.");

    const { data, error } = await supabase
      .from("training_session")
      .select()
      .eq("user_id", user?.id)
      .eq("id", sessionId)
      .single();

    if (error) throw new Error("Something went wrong...");

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch training session: ${sessionId}`);
  }
}
