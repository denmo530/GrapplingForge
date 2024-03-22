"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CircleEllipsis } from "lucide-react";

import React from "react";
import MoreMenu from "./MoreMenu";

export enum SessionType {
  "Sparring",
  "Drilling",
  "Conditioning",
}

export enum Intensity {
  "Very Low",
  "Low",
  "Moderate",
  "High",
  "Extreme",
}

export interface SessionCardProps {
  id: string;
  date: Date;
  duration: number;
  sessionType: SessionType;
  intensity: Intensity;
  details: string;
  numberOfDrills: number;
}

const SessionCard: React.FC<SessionCardProps> = ({
  id,
  duration,
  sessionType,
  intensity,
  details,
  numberOfDrills,
  date,
}) => {
  const formatedDate = new Date(date).toDateString();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="rounded-none">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="session type image"
              />
              <AvatarFallback>{sessionType}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-primary">{formatedDate}</CardTitle>
              <CardDescription className="prose text-muted-foreground">
                {sessionType} | {intensity} Intensity
              </CardDescription>
            </div>
          </div>
          <MoreMenu id={id} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="truncate prose">{details} </p>
        <div className="flex justify-between"></div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>{duration} Minutes</CardDescription>

        <Button variant="outline">See Drills ({numberOfDrills})</Button>
      </CardFooter>
    </Card>
  );
};

export default SessionCard;
