import React from "react";
import { redirect } from "next/navigation";

import EditForm from "@/app/(forge)/training-session/_components/EditForm";
import readUserSession from "@/actions/session";
import { robotoCondensed } from "@/app/fonts";
import { getTrainingSessionById } from "../../_actions/get-training-session";

export default async function Page({ params }: { params: { id: string } }) {
  const trainingSessionId = params.id;
  const { data: session } = await readUserSession();

  if (!session) {
    redirect("/");
  }

  const trainingSession = await getTrainingSessionById(trainingSessionId);

  return (
    <section className="container w-full px-4 sm:px-24 py-4 sm:py-10 space-y-4">
      <h1
        className={`${robotoCondensed.className} text-2xl sm:text-4xl font-bold`}
      >
        Update training session
      </h1>
      <EditForm trainingSession={trainingSession} />
    </section>
  );
}
