import React, { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useGetEventByIdQuery } from "../store/api/event";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  useAddParticipationMutation,
  useDeleteParticipationMutation,
  useGetParticipantsByEventIdQuery,
  useGetParticipationsByUserIdQuery,
} from "../store/api/participation";
import { useSelector } from "react-redux";
import Participants from "../components/Participants";

function CardDetails() {
  const { id } = useParams();
  const { data, isLoading, error: eventError } = useGetEventByIdQuery(id);
  const [addParticipation] = useAddParticipationMutation();
  const [deleteParticipation] = useDeleteParticipationMutation();
  const { data: participants } = useGetParticipantsByEventIdQuery(id);
  const { data: participations = [] } = useGetParticipationsByUserIdQuery();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState("");

  console.log(participants);

  const isParticipating = participants?.some(
    (participant) => participant.id === user?.id
  );
  const currentParticipation = participations?.find(
    (participation) => participation.eventId === id
  );

  const handleParticipate = async () => {
    try {
      await addParticipation(id).unwrap();
    } catch (e) {
      setError(e);
    }
  };

  const handleCancel = async () => {
    try {
      await deleteParticipation(currentParticipation.id).unwrap();
    } catch (e) {
      setError(e);
    }
  };

  if (isLoading)
    return (
      <section className="mt-25 mb-20 flex flex-col gap-5 mx-auto max-w-[700px]">
        <Skeleton className="w-full" />
        <Skeleton className="w-full h-20" />
        <Skeleton count={2} className="max-w-[40%]" />
        <Skeleton className="max-w-[70%]" />
        <Skeleton className="max-w-[50%]" />
        <div className="grid grid-cols-[40px_80px_200px] gap-5 items-center">
          <Skeleton circle={true} className="max-w-10 h-10" />
          <Skeleton className="max-w-20 " />
          <Skeleton className="max-w-50 " />
        </div>
      </section>
    );
  return (
    <section className="mt-25 mb-20 flex flex-col gap-5 mx-auto max-w-[700px] text-[18px]">
      <h2>{data.event.title}</h2>
      <p className="text-[20px]">{data.event.desc}</p>
      <span className="">
        дата начала: {new Date(data.event.startDate).toLocaleDateString()}
      </span>
      <span className="">
        дата конца: {new Date(data.event.endDate).toLocaleDateString()}
      </span>
      <span className="">
        расположение:
        <span className="ml-[5px] font-medium">{data.event.location}</span>
      </span>
      <span className="">
        требуется:
        <span className="ml-[5px] font-medium text-blue">
          {data.event.volunteerCount} волонтеров
        </span>
      </span>
      <div className="flex gap-5 items-center">
        <span className="flex gap-2.5 items-center">
          <Avatar name={data.creator.name} />
          <p>{`${data.creator.name} ${data.creator.surname}`}</p>
        </span>
        <span className="text-lgray ">
          {new Date(data.event.updatedAt).toLocaleString().slice(0, 17)}
        </span>
        <Participants participants={participants}/>
      </div>
      {user ? (
        isParticipating ? (
          <button onClick={handleCancel} className="btn block mx-auto">
            отменить участие
          </button>
        ) : (
          <button onClick={handleParticipate} className="btn block mx-auto">
            участвовать
          </button>
        )
      ) : (
        <div className="text-xl max-w-100 text-center mx-auto mt-5">
          <Link className="link" to="/auth">
            Войдите
          </Link>{" "}
          , чтобы начать принимать участия в мероприятиях
        </div>
      )}
    </section>
  );
}

export default CardDetails;
