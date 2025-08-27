import React from "react";
import volonts from "../assets/volonts.svg";
import { Link } from "react-router-dom";

function Card({
  id,
  title,
  desc,
  location,
  startDate,
  endDate,
  date,
  count,
}) {
  return (
    <Link to={`/event/${id}`}>
      <section className="hover:opacity-50 min-w-[340px] transition-opacity duration-300 max-w-[340px] px-[30px] py-5 flex flex-col gap-2.5 rounded-[30px] border border-dgray">
        <h2 className="line-clamp-2">{title}</h2>
        <p className="line-clamp-4 text-[20px]">{desc}</p>
        <span className="text-[18px] line-clamp-1 text-black">{location}</span>
        <span className="text-[18px] text-gray">{`${startDate} - ${endDate}`}</span>
        <div className="flex gap-[30px]">
          <span className="text-[18px] text-lgray">{date}</span>
          <div className="flex gap-1">
            <span className="text-[18px] text-blue">{count}</span>
            <img className="w-full" src={volonts} />
          </div>
        </div>
      </section>
    </Link>
  );
}

export default Card;
