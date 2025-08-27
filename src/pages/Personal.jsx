import Card from "../components/Card";
import Avatar from "../components/Avatar";
import logOut from "../assets/logOut.svg";
import { useAuth } from "../hooks/UseAuth";
import { useSelector } from "react-redux";
import { useGetUserEventsQuery } from "../store/api/event";
import { Link } from "react-router-dom";
import { useGetParticipationsByUserIdQuery } from "../store/api/participation";
import { useState } from "react";

function Personal() {
  const [activeTab, setActiveTab] = useState(0);
  const { logout, message } = useAuth();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    await logout();
  };

  const { data: events, isLoading, error } = useGetUserEventsQuery();
  const { data: participations } = useGetParticipationsByUserIdQuery();

  const tabs = [
    {
      title: "Ваши мероприятия:",
      content: events,
    },
    {
      title: "Ваши участия:",
      content: participations?.map((participation) => participation.event),
    },
  ];

  return (
    <>
      <div className="mx-auto w-fit">
        <section className="flex gap-5 mt-[90px] flex-wrap justify-center">
          <div className="pt-2.5">
            {<Avatar name={user.name} width={80} fz={30} transition={false} />}
          </div>
          <section className="flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="text-[20px] text-gray">имя:</span>
              <h2 className="hyphens-auto">{user.name}</h2>
              <h2 className="hyphens-auto">{message}</h2>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] text-gray">фамилия:</span>
              <h2 className="hyphens-auto">{user.surname}</h2>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] text-gray">телефон:</span>
              <h2 className="">+{user.phone}</h2>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] text-gray">эл. почта:</span>
              <h2 className="break-all">{user.email}</h2>
            </div>
            <div className="flex gap-[50px] items-center">
              <span className="text-[16px] max-w-[100px] truncate text-gray">
                id: {user.id}
              </span>
              <button
                onClick={handleLogout}
                className="hover:opacity-70 transition-opacity"
                title="Выйти из системы"
              >
                <img src={logOut} />
              </button>
            </div>
          </section>
        </section>
      </div>

      <section className="mt-[70px]">
        <div className="flex gap-5">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`${
                activeTab === i ? "!text-blue" : ""
              } text-[28px] mb-1 text-gray font-medium hover:text-blue transition-colors duration-200`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <hr className="text-lgray" />
        <section className="mt-[50px] mx-auto max-w-[1100px] flex gap-10 flex-wrap justify-center mb-15">
          {tabs[activeTab].content && tabs[activeTab].content.length > 0 ? (
            tabs[activeTab].content.map((event) => (
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
            ))
          ) : activeTab === 0 ? (
            <div className="text-xl">
              У вас пока нет созданных мероприятий,{" "}
              <Link className="link" to="/add">
                создайте
              </Link>{" "}
              своё первое мероприятие!
            </div>
          ) : (
            <div className="text-xl">
              У вас пока нет участий,{" "}
              <Link className="link" to="/dashboard">
                поучаствуйте
              </Link>{" "}
              в своём первом мероприятие!
            </div>
          )}
        </section>
      </section>
    </>
  );
}

export default Personal;
