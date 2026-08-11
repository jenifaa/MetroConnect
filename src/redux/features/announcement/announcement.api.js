import { baseApi } from "@/redux/baseApi";

export const announcementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query({
      query: (params) => ({
        url: "/announcements",
        method: "GET",
        params,
      }),
      providesTags: ["ANNOUNCEMENT"],
    }),

    getAnnouncementById: builder.query({
      query: (id) => ({
        url: `/announcements/${id}`,
        method: "GET",
      }),
      providesTags: ["ANNOUNCEMENT"],
    }),

    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: "/announcements",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ANNOUNCEMENT"],
    }),

    updateAnnouncement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/announcements/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ANNOUNCEMENT"],
    }),

    deleteAnnouncement: builder.mutation({
      query: (id) => ({
        url: `/announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ANNOUNCEMENT"],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useGetAnnouncementByIdQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
