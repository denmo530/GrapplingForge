"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "../overview/Overview";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { session } = useSessionContext();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-start justify-center px-16">
      <Tabs defaultValue="overview" className="my-6 hidden md:block">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trainingLogs">Training Logs</TabsTrigger>
          <TabsTrigger value="Goals">Goals</TabsTrigger>
          <TabsTrigger value="Competitions">Competitions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
