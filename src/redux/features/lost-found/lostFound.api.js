import { baseApi } from "@/redux/baseApi";

export const lostFoundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLostFound: builder.query({
      query: (params) => ({
        url: "/lost-found",
        method: "GET",
        params,
      }),
      providesTags: ["LOST_FOUND"],
    }),

    getLostFoundById: builder.query({
      query: (id) => ({
        url: `/lost-found/${id}`,
        method: "GET",
      }),
      providesTags: ["LOST_FOUND"],
    }),

    createLostFound: builder.mutation({
      query: (data) => ({
        url: "/lost-found",
        method: "POST",
        data,
      }),
      invalidatesTags: ["LOST_FOUND"],
    }),

    updateLostFound: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/lost-found/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["LOST_FOUND"],
    }),

    deleteLostFound: builder.mutation({
      query: (id) => ({
        url: `/lost-found/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LOST_FOUND"],
    }),
  }),
});

export const {
  useGetLostFoundQuery,
  useGetLostFoundByIdQuery,
  useCreateLostFoundMutation,
  useUpdateLostFoundMutation,
  useDeleteLostFoundMutation,
} = lostFoundApi;
