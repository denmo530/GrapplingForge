import React from "react";
import { RotateCw } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { signUpWithEmailAndPassword } from "@/app/(auth)/auth/actions/auth-server-actions";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const RegisterSchema = z
    .object({
      password: z.string().min(6, { message: "Password is required." }),
      confirm: z.string().min(6, { message: "Password is required." }),
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
      username: z.string().min(5, "Username has to be at least 5 characters."),
      fullName: z.string().min(2, "Name is required."),
    })
    .refine((data) => data.confirm === data.password, {
      message: "Password did not match",
      path: ["confirm"],
    });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      username: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      const result = await signUpWithEmailAndPassword(data);
      const { error, data: userData } = JSON.parse(result);

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
      }

      toast({
        title: "You submitted the following values",
        variant: "default",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-300 p-4">
            <code className="text-black">Successfully Registered</code>
          </pre>
        ),
      });
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
            <div className="mb-6 space-y-2">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>Your full name.</FormDescription>
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
                        <Input placeholder="@John" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your display name to other users.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Your emailadress.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
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
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormDescription>
                Password needs to be at least 6 characters and include capital
                letters and numbers.
              </FormDescription>
            </div>
            <Button
              type="submit"
              variant={"default"}
              disabled={isPending}
              className="w-full flex gap-2 transition-all"
            >
              <RotateCw
                className={cn("animate-spin", { hidden: !isPending })}
              />
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;
