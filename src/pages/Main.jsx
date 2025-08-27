import React from "react";
import Header from "../components/Header";
import hero from "../assets/hero.png";

function Main() {
  return (
    <>
      <section className="flex flex-wrap items-center justify-between gap-[25px] mt-[120px]">
        <section className="mx-auto">
          <h1 className="max-w-[500px] mb-5">СИСТЕМА УЧЕТА ВОЛОНТЕРОВ</h1>
          <p className="max-w-[715px] text-[28px]">
            – удобный инструмент для организации и координации добровольцев. С
            ее помощью вы сможете:
            <li className="!list-disc pl-[15px]">
              регистрировать и хранить данные волонтеров
            </li>
            <li className="!list-disc pl-[15px]">
              создавать мероприятия с гибкими настройками
            </li>
            <li className="!list-disc pl-[15px]">
              искать и откликаться на события
            </li>
            <li className="!list-disc pl-[15px]">и многое другое!</li>
            <br />
            <span className="font-medium text-blue">
              Присоединяйтесь и делайте добрые дела эффективнее!
            </span>
          </p>
        </section>
        <img src={hero} className="h-full mx-auto" />
      </section>
    </>
  );
}

export default Main;
