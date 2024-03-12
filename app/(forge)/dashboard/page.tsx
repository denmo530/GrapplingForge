import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import readUserSession from "@/actions/session";
import { getTechniqueById, getTechniques } from "../actions/techniques";

export default async function Page() {
  const { data } = await readUserSession();

  if (!data?.session) {
    return redirect("/");
  }

  // const techniques = await getTechniques();

  // console.log(techniques);

  return (
    <div className="flex flex-col items-start justify-center px-16">
      <Tabs defaultValue="overview" className="my-6 hidden md:block">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trainingLogs">Training Logs</TabsTrigger>
          <TabsTrigger value="Goals">Goals</TabsTrigger>
          <TabsTrigger value="Competitions">Competitions</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
