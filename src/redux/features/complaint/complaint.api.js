import { baseApi } from "@/redux/baseApi";

export const complaintApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: (params) => ({
        url: "/complaints",
        method: "GET",
        params,
      }),
      providesTags: ["COMPLAINT"],
    }),

    getComplaintById: builder.query({
      query: (id) => ({
        url: `/complaints/${id}`,
        method: "GET",
      }),
      providesTags: ["COMPLAINT"],
    }),

    createComplaint: builder.mutation({
      query: (data) => ({
        url: "/complaints",
        method: "POST",
        data,
      }),
      invalidatesTags: ["COMPLAINT"],
    }),

    updateComplaintStatus: builder.mutation({
      query: ({ id, status, resolutionDetails }) => ({
        url: `/complaints/${id}/status`,
        method: "PATCH",
        data: { status, resolutionDetails },
      }),
      invalidatesTags: ["COMPLAINT"],
    }),
  }),
});

export const {
  useGetComplaintsQuery,
  useGetComplaintByIdQuery,
  useCreateComplaintMutation,
  useUpdateComplaintStatusMutation,
} = complaintApi;
