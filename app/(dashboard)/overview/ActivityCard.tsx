import React from "react";
import { Activity } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ActivityCard = () => {
  return (
    <Card className="md:w-[380px] w-fit">
      <CardHeader>
        <CardTitle className="flex justify-between text-neutral-700">
          Activity
          <Activity className="text-neutral-700" />
        </CardTitle>
        <CardDescription>
          Your training activity the latest 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Show some kind of datatable with latest workouts</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
