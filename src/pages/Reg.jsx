import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Reg() {
  const { register: reg, message } = useAuth();

  const RegSchema = z
    .object({
      name: z.string().min(1, "Заполните это поле"),
      surname: z.string().min(1, "Заполните это поле"),
      email: z.string().email("Некорректный email"),
      phone: z
        .string()
        .min(10, "Номер слишком короткий")
        .max(15, "Номер слишком длинный")
        .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
          message: "Некорректный номер телефона",
        }),
      password: z.string().min(6, "Пароль должен быть от 6 символов"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegSchema) });

  const onSubmit = async (data) => {
    await reg(data);
    reset();
  };

  return (
    <>
      <section className="grid grid-cols-1 desktop:grid-cols-[minmax(500px,_715px)_458px] gap-15 justify-between mt-[120px]">
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
          className="mx-auto items-center flex px-6 med:px-15 py-[30px] flex-col gap-[25px] border-black border-[1px] rounded-[50px]"
        >
          <h2 className="text-center">РЕГИСТРАЦИЯ</h2>

          <div className="w-full">
            <input
              {...register("name")}
              placeholder="имя"
              className="input w-full mb-[-5px]"
              type="text"
            />
            {errors.name && (
              <span className="text-red-400 text-xs pl-5 w-fit">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <input
              {...register("surname")}
              placeholder="фамилия"
              className="input w-full mb-[-5px]"
              type="text"
            />
            {errors.surname && (
              <span className="text-red-400 text-xs pl-5 w-fit">
                {errors.surname.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <input
              {...register("phone")}
              placeholder="номер телефона"
              className="input w-full mb-[-5px]"
              type="tel"
            />
            {errors.phone && (
              <span className="text-red-400 text-xs pl-5 w-fit">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <input
              {...register("email")}
              placeholder="эл. почта"
              className="input w-full mb-[-5px]"
              type="email"
            />
            {errors.email && (
              <span className="text-red-400 text-xs pl-5 w-fit">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <input
              {...register("password")}
              placeholder="пароль"
              className="input w-full mb-[-5px]"
              type="password"
            />
            {errors.password && (
              <span className="text-red-400 text-xs pl-5 w-fit">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <input
              {...register("confirmPassword")}
              placeholder="повторите пароль"
              className="input w-full mb-[-5px]"
              type="password"
            />
            {errors.confirmPassword && (
              <span className="text-red-400 text-xs pl-5 w-fit">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button className="btn" type="submit">
            зарегистрироваться
          </button>
          <span className="text-center text-dgray text-[14px]">
            уже зарегистрированы? можете{" "}
            <Link className="link" to="/auth">
              авторизоваться
            </Link>
          </span>
          <span className="text-center text-green-400 text-[14px]">
            {message}
          </span>
        </form>
      </section>
    </>
  );
}

export default Reg;
