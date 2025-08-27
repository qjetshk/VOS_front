import React from "react";
import Card from "../components/Card";
import { useGetAllEventsQuery } from "../store/api/event";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DashBoard() {
  const { data: events, isLoading, error } = useGetAllEventsQuery();

  if (isLoading) {
    return (
      <section className="mt-25 mb-20 grid grid-cols-2 gap-10 mx-auto max-w-[720px]">
        <Skeleton className="w-full h-[240px]" />
        <Skeleton className="w-full h-[240px]" />
        <Skeleton className="w-full h-[240px]" />
        <Skeleton className="w-full h-[240px]" />
        <Skeleton className="w-full h-[240px]" />
        <Skeleton className="w-full h-[240px]" />
        <Skeleton className="w-full h-[240px]" />
        <Skeleton className="w-full h-[240px]" />
      </section>
    );
  }

  return (
    <section className="mt-25">
      <h2 className="text-center">ВСЕ МЕРОПРИЯТИЯ:</h2>
      <section className="mt-[50px] mx-auto max-w-[1100px] flex gap-10 flex-wrap justify-center mb-15">
        {events.map((event) => (
          <Card
            key={event.id}
            id={event.id}
            title={event.title}
            desc={event.desc}
            location={event.location}
            startDate={new Date(event.startDate).toLocaleDateString()}
            endDate={new Date(event.endDate).toLocaleDateString()}
            date={new Date(event.updatedAt).toLocaleDateString()}
            count={event.volunteerCount}
          />
        ))}
      </section>
    </section>
  );
}

export default DashBoard;
