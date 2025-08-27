import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const participationApi = createApi({
  reducerPath: "participationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/participation`,
    credentials: "include",
  }),

  tagTypes: ["Participation"],
  endpoints: (builder) => ({
    getParticipantsByEventId: builder.query({
      query: (eventId) => `get/${eventId}`,
      providesTags: ["Participation"],
    }),
    getParticipationsByUserId: builder.query({
      query: () => `get_user`,
      providesTags: ["Participation"],
    }),
    addParticipation: builder.mutation({
      query: (eventId) => ({
        url: `add/${eventId}`,
        method: "POST",
      }),
      invalidatesTags: ["Participation"],
    }),
    deleteParticipation: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Participation"],
    }),
  }),
});

export const {
  useGetParticipantsByEventIdQuery,
  useGetParticipationsByUserIdQuery,
  useAddParticipationMutation,
  useDeleteParticipationMutation,
} = participationApi;
