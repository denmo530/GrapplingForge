"use client";
import { CalendarIcon, RotateCw } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { createTrainingSession } from "../_actions/create-training-session";

const sessionTypes = ["Drilling", "Sparring", "Conditioning"];
const intensities = ["Very Low", "Low", "Moderate", "High", "Extreme"];

// TODO: Fix type for trainingSession
export default function EditForm({
  trainingSession,
}: {
  trainingSession: any;
}) {
  const [isPending, startTransition] = useTransition();

  const FormSchema = z.object({
    details: z
      .string()
      .min(10, { message: "Description must be at least 10 character(s)" }),
    duration: z
      .number()
      .min(1, { message: "Duration must be specified." })
      .default(60),

    sessionType: z.string({
      required_error:
        "Please select a session type - Drilling, Sparring or Conditioning.",
    }),
    intensity: z.string({
      required_error: "Please select an intensity.",
    }),
    date: z.date({
      required_error: "A date of the training session is required.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      details: trainingSession.details,
      duration: trainingSession.duration,
      sessionType: trainingSession.session_type,
      intensity: trainingSession.intensity,
      date: new Date(trainingSession.date),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("details", data.details);
      formData.append("duration", String(data.duration));
      formData.append("sessionType", data.sessionType);
      formData.append("intensity", data.intensity);
      formData.append("date", data.date.toISOString());

      // TODO: Await update training session
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="mb-6 space-y-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of training session.</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sessionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of training to log." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sessionTypes.map((type, i) => (
                        <SelectItem key={i} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="intensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intensity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {intensities.map((type, i) => (
                        <SelectItem key={i} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="duration"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Duration - {value ?? 60} minutes</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={120}
                    step={5}
                    defaultValue={[60]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Focused on drilling heel hooks and messing up my partner's knees in sparring."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the focus points of your training. This will be used
                  to analyze your training with AI✨
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          variant={"default"}
          disabled={isPending}
          className="w-full flex gap-2 bg-malibu-500 hover:bg-malibu-500/90"
        >
          <RotateCw
            color="white"
            className={cn("animate-spin", { hidden: !isPending })}
          />
          Update session
        </Button>
      </form>
    </Form>
  );
}
