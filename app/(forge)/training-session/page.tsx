import React from "react";
import readUserSession from "@/actions/session";
import { redirect } from "next/navigation";
import Search from "./_components/Search";
import { Suspense } from "react";
import SkeletonCard from "./_components/SkeletonCard";
import CardWrapper from "./_components/CardWrapper";
import { getTrainingSessions } from "./_actions/get-training-session";
import SessionPagination from "./_components/SessionPagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return redirect("/");
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { totalPages } = await getTrainingSessions(query, currentPage);

  return (
    <section className="container w-full px-4 sm:px-24 py-4 sm:py-10 space-y-4">
      <div className="mb-6">
        <h1 className="font-bold text-4xl text-primary">Training Session</h1>
        <span className="text-md text-muted-foreground prose">
          Track and Analyze Your Grappling Training Sessions and Drills with
          Ease!
        </span>
      </div>
      <Search />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-6">
        <Suspense fallback={<SkeletonCard />}>
          <CardWrapper query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <SessionPagination totalPages={totalPages} />
    </section>
  );
}
