"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const TrainingSessionSchema = z.object({
  details: z
    .string()
    .min(10, { message: "Description must be at least 10 character(s)" })
    .optional(),
  duration: z.coerce
    .number()
    .gt(0, { message: "Duration must be greater than 0 minutes." })
    .default(60),
  sessionType: z.string({
    required_error:
      "Please select a session type - Drilling, Sparring or Conditioning.",
  }),
  intensity: z.string({
    required_error: "Please select an intensity.",
  }),
  date: z
    .string({
      required_error: "A date of the training session is required.",
    })
    .optional(),
  userId: z.string().optional(),
});

const CreateTrainingSession = TrainingSessionSchema.omit({
  userId: true,
});

export type State = {
  errors?: {
    userId?: string;
    duraton?: number;
    sessionType?: string;
    intensity?: string;
  };
  message?: string | null;
};

export async function createTrainingSession(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;

  // Validate form fields using Zod
  const validatedFields = CreateTrainingSession.safeParse({
    details: formData.get("details"),
    duration: formData.get("duration"),
    sessionType: formData.get("sessionType"),
    intensity: formData.get("intensity"),
    date: formData.get("date"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Training Session.",
    };
  }

  // Prepare data for insertion into the database
  const { details, duration, sessionType, intensity, date } =
    validatedFields.data;

  try {
    const { data, error } = await supabase
      .from("training_session")
      .insert({
        duration: duration,
        details: details,
        session_type: sessionType,
        intensity: intensity,
        user_id: user?.id,
        date: date,
      })
      .eq("user_id", user?.id);
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Training Session.",
    };
  }

  // Revalidate the cache for the training sessions page and redirect the user.
  revalidatePath("/training-session");
  redirect("/training-session");
}
