"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirm: string;
  fullName: string;
  username: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
        username: data.username,
      },
    },
  });

  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}

export async function logout() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/");
}

// export async function deleteUser() {
//   try {
//     const supabase =  createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL || "",
//       process.env.SUPABASE_SERVICE_ROLE_PRIVATE_KEY || ""
//     );

//     const {
//       data: { user },
//       error: authError,
//     } = await supabase.auth.getUser();

//     if (authError) throw authError;

//     if (!user) throw new Error("Could not find user.");

//     const { data, error } = await supabase.auth.admin.deleteUser(user?.id);

//     if (error) throw error;

//     console.log("Successfully removed user.");
//     logout();
//   } catch (error) {
//     console.log(error);
//     console.error(error);
//   }
// }
