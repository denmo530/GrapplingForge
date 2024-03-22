import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_LOCAL_ANON_KEY!
  );
}
