import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/event` ,
    credentials: "include",
  }),

  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getEventById: builder.query({
      query: (id) => `get/${id}`,
      providesTags: ["Event"],
    }),
    getUserEvents: builder.query({
      query: () => "get_user",
      providesTags: ["Event"],
    }),
    getAllEvents: builder.query({
      query: () => "get_all",
      providesTags: ["Event"],
    }),
    addEvent: builder.mutation({
      query: (eventData) => ({
        url: "add",
        method: "POST",
        body: eventData,
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventByIdQuery,
  useGetUserEventsQuery,
  useGetAllEventsQuery,
  useAddEventMutation,
  useDeleteEventMutation,
} = eventApi;
