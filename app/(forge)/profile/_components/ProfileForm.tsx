"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useState, useCallback, useEffect, use } from "react";
import { UserMetadata, type User } from "@supabase/supabase-js";
import ProfileAvatar from "./ProfileAvatar";
import { RotateCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const FormSchema = z.object({
  fullName: z.string().min(1, { message: "Name is required." }),
  username: z.string().min(1, { message: "Display name is required." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

const ProfileForm = ({ user }: { user: User | null }) => {
  const supabase = createSupabaseClient();

  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatedUserData, setUpdatedUserData] = useState<UserMetadata>({
    full_name: fullname || "",
    username: username || "",
    avatar_url: avatar_url || "",
    id: user?.id || "",
    updated_at: new Date().toISOString(),
  });

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("users")
        .select()
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error("Error loading user data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile(userData: UserMetadata) {
    console.log(userData);
    const filteredUserData = Object.fromEntries(
      Object.entries(userData).filter(([key, value]) => value !== "")
    );

    console.log(filteredUserData);

    try {
      setLoading(true);

      const { error } = await supabase.from("users").upsert(filteredUserData);
      if (error) throw error;
      console.log("Profile updated!");
    } catch (error) {
      console.error("Error updating the data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      username: "",
    },
  });

  const onSubmit = () => {};
  return (
    <div className="mx-auto flex flex-col sm:flex-row gap-4 items-center">
      <ProfileAvatar
        url={avatar_url}
        uid={user?.id ?? null}
        size={200}
        onUpload={(url) => {
          updateProfile({ ...updatedUserData, avatar_url: url });
        }}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={fullname || ""}
                      {...field}
                      value={updatedUserData.full_name}
                      onChange={(e) =>
                        setUpdatedUserData((prevState) => ({
                          ...prevState,
                          full_name: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder={user?.email} {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={username || ""}
                      {...field}
                      value={updatedUserData.username}
                      onChange={(e) =>
                        setUpdatedUserData((prevState) => ({
                          ...prevState,
                          username: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Your Display name is a unique name used to connect with
                    other smith&apos;s of the forge.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant={"default"}
            className="w-full flex gap-2 bg-malibu-500"
            disabled={loading}
            onClick={() => updateProfile(updatedUserData)}
          >
            Update Profile
            {loading && <RotateCw color="white" className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
