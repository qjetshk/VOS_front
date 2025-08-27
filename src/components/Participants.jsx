import React from "react";
import Avatar from "./Avatar";

const Participants = ({ participants }) => {
  const firstThree = participants?.slice(0, 3);
  return (
    <div className="ml-50 flex">
      {firstThree?.map((participant, i) => (
        <div
          key={participant.id}
          className={`z-${i} not-first:ml-[-15px] filter not-first:drop-shadow-[-3px_0_3px_rgba(0,0,0,0.15)]`}
        >
          <Avatar name={participant.name} />
        </div>
      ))}
      <div className="ml-3 font-medium flex items-center">
        {participants?.length - 3 > 0 ? `+${participants.length - 3}` : ''}
      </div>
    </div>
  );
};

export default Participants;
