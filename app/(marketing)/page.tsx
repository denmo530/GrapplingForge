import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col ">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-sky-100 text-sky-700 rounded-full uppercase">
          <Dumbbell className="h-6 w-6 mr-2" />
          No 1 Grappling Analytics
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 font-semibold">
          GrapplingForge shapes you
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-sky-600 to-green-600 text-white px-4 p-2 rounded-md pb-4 w-fit font-medium">
          Accelerate.
        </div>
      </div>
      <div className="text-sm md:text-xl mt-4 max-w-xs md:max-w-2xl text-center mx-auto text-muted-foreground">
        Gain analytical insights, goal and workout management, and reach new
        levels. From white-belt to black-belt, with the help of data analytics
        and machine learning.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Join the Forge</Link>
      </Button>
    </div>
  );
}
