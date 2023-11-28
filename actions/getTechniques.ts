import { Technique } from "@/types";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getTechniques = async (): Promise<Technique[]> => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("techniques")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getTechniques;
