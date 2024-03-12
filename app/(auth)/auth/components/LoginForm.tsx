import { FacebookIcon, GithubIcon, RotateCw } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Provider } from "@supabase/supabase-js";
import { signInWithEmailAndPassword } from "@/app/(auth)/auth/actions/auth-server-actions";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import OAuthButton from "@/components/inputs/OAuthButton";
import { FaGoogle } from "react-icons/fa";

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [isPending, startTransition] = useTransition();

  const LoginSchema = z.object({
    password: z.string().min(1, { message: "Password is required." }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(data);

      const { error } = JSON.parse(result);

      if (error?.message) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "You submitted the following values",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-300 p-4">
              <code className="text-black">{error.message}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "You submitted the following values",
          variant: "default",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-300 p-4">
              <code className="text-black">Successfully Logged in</code>
            </pre>
          ),
        });

        onClose();

        redirect("/dashboard");
      }
    });
  };

  return (
    <>
      <h3 className="text-sm leading-normal text-left mb-6">
        Log in to your account with email.
      </h3>
      <div className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="mb-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant={"default"}
              disabled={isPending}
              className="w-full flex gap-2"
            >
              <RotateCw
                color="white"
                className={cn("animate-spin", { hidden: !isPending })}
              />
              Sign In
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted-foreground" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 py-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <OAuthButton provider="google" icon={<FaGoogle size={17} />} />
          <OAuthButton provider="github" icon={<GithubIcon />} />
          <OAuthButton provider="facebook" icon={<FacebookIcon />} />
        </div>
      </div>
    </>
  );
};
