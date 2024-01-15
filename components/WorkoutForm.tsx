import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, ChevronsUpDown, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Technique } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const formSchema = z.object({
  duration: z.coerce.number().min(0),
  date: z.date({
    required_error: "A date for the workout is required.",
  }),
  intensity: z.string(),
  martialArtsTechniques: z.string().optional(),
  performance: z.coerce.number().min(0),
  success: z.boolean().default(true),
  strengthExercises: z.string().optional(),
  sets: z.number().min(0).optional(),
  reps: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
});

const intensities = [
  {
    name: "Light",
    description: "Gentle activity, easy pace.",
    value: 1,
  },
  {
    name: "Moderate",
    description: "A moderate level of effort. Challenging but sustainable.",
    value: 2,
  },
  {
    name: "Vigorous",
    description: "High intensity, challenging, and demanding.",
    value: 3,
  },
  {
    name: "Intense",
    description: "Very challenging, pushing your limits.",
    value: 4,
  },
  {
    name: "Extreme",
    description: "Maximum effort, extremely challenging.",
    value: 5,
  },
];

export const WorkoutForm = () => {
  const [techniques, setTechniques] = useState<Technique[]>([]);

  useEffect(() => {
    const fetchTechniques = async () => {
      const supabase = createClientComponentClient();

      const { data, error } = await supabase
        .from("techniques")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
      }

      if (data) setTechniques(data);
    };

    fetchTechniques();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // add to supabase
    console.log("form submitted");
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of workout</FormLabel>
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
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>The date of your workout</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="flex gap-x-4 mb-1">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="Duration" type="number" {...field} />
                  </FormControl>
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
                      {intensities.map(({ value, name, description }) => {
                        return (
                          <SelectItem key={value} value={name}>
                            {name} - {description}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription>
            The duration and intensity of your workout. Duration in minutes and
            intensity from low to high.
          </FormDescription>
        </div>
        <Tabs defaultValue="techniques" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="techniques">
              Martial Arts Techniques
            </TabsTrigger>
            <TabsTrigger value="exercises">Strength & Conditioning</TabsTrigger>
          </TabsList>
          <TabsContent value="techniques">
            <div>
              <div className="flex items-center gap-x-4 mb-1">
                <FormField
                  control={form.control}
                  name="martialArtsTechniques"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Techniques</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? techniques.find(
                                    (technique) =>
                                      technique.name === field.value
                                  )?.name
                                : "Select technique"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search technique..." />
                            <CommandEmpty>No technique found.</CommandEmpty>
                            <ScrollArea>
                              <CommandList>
                                {techniques.map((technique) => (
                                  <CommandItem
                                    value={technique.name}
                                    key={technique.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "martialArtsTechniques",
                                        technique.name
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        technique.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {technique.name}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="performance"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormControl>
                        <Input
                          placeholder="Performance"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormDescription>
                Techniques in submission grappling, BJJ and MMA.
              </FormDescription>
            </div>
          </TabsContent>
          <TabsContent value="exercises">
            Change your password here.
          </TabsContent>
        </Tabs>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
