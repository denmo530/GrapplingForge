import React from "react";
import { Goal } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const GoalProgressionCard = () => {
  return (
    <Card className="md:w-[380px] w-fit">
      <CardHeader>
        <CardTitle className="flex justify-between text-neutral-700">
          Goal Progress
          <Goal className="text-neutral-700" />
        </CardTitle>
        <CardDescription>Your active goals at the moment.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Show active goals</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
