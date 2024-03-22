import { getTrainingSessions } from "../_actions/get-training-session";
import SessionCard from "./SessionCard";

interface CardWrapperProps {
  query: string;
  currentPage: number;
}

export default async function CardWrapper({
  query,
  currentPage,
}: CardWrapperProps) {
  const { data: trainingSessions } = await getTrainingSessions(
    query,
    currentPage
  );

  return (
    <>
      {trainingSessions?.map((data) => (
        <SessionCard
          key={data.id}
          id={data.id}
          date={data.date}
          duration={data.duration}
          sessionType={data.session_type}
          intensity={data.intensity}
          details={data.details}
          numberOfDrills={0}
        />
      ))}
    </>
  );
}
