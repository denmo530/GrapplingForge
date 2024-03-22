import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
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

const SkeletonCard = () => {
  return (
    <>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-row gap-1 items-center">
          <Skeleton className="w-12 h-12 " />
          <Skeleton className="flex-grow h-12" />
        </CardHeader>
        <CardContent>
          <Skeleton className="flex-grow h-6 mt-4" />
          <Skeleton className="flex-grow h-6 mt-4" />
          <Skeleton className="w-1/2 h-6 mt-4" />
        </CardContent>
      </Card>
    </>
  );
};

export default SkeletonCard;
