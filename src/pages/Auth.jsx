import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Auth() {
  const { login, loading, message } = useAuth();
  const navigate = useNavigate();

  const AuthSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль должен быть от 6 символов"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(AuthSchema) });

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    reset();
    if (success) {
      setTimeout(() => {
        navigate("/personal");
      }, 2000);
    }
  };

  return (
    <>
      <section className="grid grid-cols-1 desktop:grid-cols-[minmax(500px,_715px)_512px] gap-15 justify-between mt-[120px]">
        <section className="hidden desktop:block mx-auto">
          <h1 className="max-w-[500px] mb-5">СИСТЕМА УЧЕТА ВОЛОНТЕРОВ</h1>
          <p className="max-w-[715px] text-[28px]">
            – удобный инструмент для организации и координации добровольцев. С
            ее помощью вы сможете:
            <li className="!list-disc pl-[15px]">
              регистрировать и хранить данные волонтеров
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto h-fit items-center flex px-6 med:px-15 py-[30px] flex-col gap-[25px] border-black border-[1px] rounded-[50px]"
          action=""
        >
          <h2 className="text-center">ВОЙТИ</h2>
          <div className="w-full">
            <input
              {...register("email")}
              placeholder="эл. почта"
              className="input w-full"
              type="text"
            />
            {errors.email && (
              <span className="text-red-400 text-xs pl-5">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              {...register("password")}
              placeholder="пароль"
              className="input w-full"
              type="password"
            />
            {errors.password && (
              <span className="text-red-400 text-xs pl-5">
                {errors.password.message}
              </span>
            )}
          </div>

          <button className="btn" type="submit" disabled={loading}>
            войти
          </button>
          <span className="text-center text-dgray text-[14px]">
            еще не зарегистрированы? можете{" "}
            <Link className="link" to="/reg">
              зарегистрироваться
            </Link>
          </span>
          <span className="text-center text-red-400 text-sm">{message}</span>
        </form>
      </section>
    </>
  );
}

export default Auth;
