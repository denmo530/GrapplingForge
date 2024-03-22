import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteTrainingSessionById(sessionId: string) {
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
      .delete()
      .eq("user_id", user?.id)
      .eq("id", sessionId);

    if (error) throw new Error("Something went wrong...");

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch training session: ${sessionId}`);
  }
}
