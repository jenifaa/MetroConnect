import { baseApi } from "@/redux/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => ({
        url: "/notifications",
        method: "GET",
        params,
      }),
      providesTags: ["NOTIFICATION"],
    }),

    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),

    markAllNotificationsRead: builder.mutation({
      query: () => ({
        url: "/notifications/read-all",
        method: "POST",
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = notificationApi;
