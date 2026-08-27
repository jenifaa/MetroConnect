import { baseApi } from "@/redux/baseApi";

export const complaintApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: (params) => ({
        url: "/complains/me",
        method: "GET",
        params,
      }),
      providesTags: ["COMPLAINT"],
    }),

    getAdminComplaints: builder.query({
      query: (params) => ({
        url: "/complains",
        method: "GET",
        params,
      }),
      providesTags: ["COMPLAINT"],
    }),

    getComplaintById: builder.query({
      query: (id) => ({
        url: `/complains/${id}`,
        method: "GET",
      }),
      providesTags: ["COMPLAINT"],
    }),

    createComplaint: builder.mutation({
      query: (data) => ({
        url: "/complains",
        method: "POST",
        data,
      }),
      invalidatesTags: ["COMPLAINT"],
    }),

    updateComplaintStatus: builder.mutation({
      query: ({ id, status, adminResponse }) => ({
        url: `/complains/${id}`,
        method: "PATCH",
        data: { status, adminResponse },
      }),
      invalidatesTags: ["COMPLAINT"],
    }),
  }),
});

export const {
  useGetComplaintsQuery,
  useGetAdminComplaintsQuery,
  useGetComplaintByIdQuery,
  useCreateComplaintMutation,
  useUpdateComplaintStatusMutation,
} = complaintApi;
