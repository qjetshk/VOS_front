import React from "react";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddEventMutation } from "../store/api/event";

function Add() {
  const [startDate, setStartDate] = useState("");
  const [response, setResponse] = useState(undefined);

  const [addEvent, { isLoading, error, isSuccess }] = useAddEventMutation();

  const AddSchema = z
    .object({
      title: z.string().min(1, "Название мероприятия обязательно"),
      desc: z.string().min(1, "Описание мероприятия обязательно"),
      startDate: z.string().min(1, "Укажите дату начала"),
      endDate: z.string().min(1, "Укажите дату окончания"),
      location: z.string().min(1, "Укажите место"),
      volunteerCount: z.number().min(1, "Число должно быть не меньше 1"),
    })
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
      message: "Дата окончания должна быть позже начала",
      path: ["endDate"],
    })
    .transform((data) => ({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      volunteerCount: Number(data.volunteerCount),
    }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(AddSchema) });

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const result = await addEvent(data).unwrap();
      setResponse(result)
      reset();
    } catch (e) {
      console.log(e.message)
    }
  };

  return (
    <form
      className="mt-25 flex flex-col max-w-[480px] gap-[25px] mx-auto mb-10"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="text-center">НОВОЕ МЕРОПРИЯТИЕ</h2>

      <div className="flex flex-col">
        <input
          {...register("title")}
          placeholder="название"
          className={`input ${errors.title ? "border-red-500" : ""}`}
          type="text"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <textarea
          placeholder="описание..."
          className={`input min-h-[155px] max-h-[300px] ${
            errors.desc ? "border-red-500" : ""
          }`}
          {...register("desc")}
        />
        {errors.desc && (
          <span className="text-red-500 text-sm">{errors.desc.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="pl-5 text-gray" htmlFor="startDate">
          дата начала
        </label>
        <input
          className={`input ${errors.startDate ? "border-red-500" : ""}`}
          {...register("startDate")}
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {errors.startDate && (
          <span className="text-red-500 text-sm">
            {errors.startDate.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="pl-5 text-gray" htmlFor="endDate">
          дата конца
        </label>
        <input
          className={`input ${
            errors.endDate || errors.dateError ? "border-red-500" : ""
          }`}
          {...register("endDate")}
          type="date"
          min={
            new Date(startDate).toLocaleDateString("en-CA") ||
            new Date().toLocaleDateString("en-CA")
          }
        />
        {errors.endDate && (
          <span className="text-red-500 text-sm">{errors.endDate.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          placeholder="расположение"
          className={`input ${errors.location ? "border-red-500" : ""}`}
          type="text"
          {...register("location")}
        />
        {errors.location && (
          <span className="text-red-500 text-sm">
            {errors.location.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          placeholder="кол-во волонтеров"
          className={`input ${errors.volunteerCount ? "border-red-500" : ""}`}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min={1}
          {...register("volunteerCount", {
            valueAsNumber: true,
          })}
        />
        {errors.volunteerCount && (
          <span className="text-red-500 text-sm">{errors.volunteerCount.message}</span>
        )}
      </div>

      <button className="btn block mx-auto" type="submit">
        опубликовать
      </button>
      <div>{response?.message}</div>
    </form>
  );
}

export default Add;
