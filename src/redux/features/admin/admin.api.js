import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["ADMIN_DASHBOARD"],
    }),

    getAdminUsers: builder.query({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, status, role }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        data: { status, role },
      }),
      invalidatesTags: ["USER", "ADMIN_DASHBOARD"],
    }),

    getReportedContent: builder.query({
      query: (params) => ({
        url: "/admin/reports",
        method: "GET",
        params,
      }),
      providesTags: ["POST"],
    }),

    resolveReport: builder.mutation({
      query: ({ id, action }) => ({
        url: `/admin/reports/${id}`,
        method: "POST",
        data: { action }, // 'dismiss' or 'remove_content'
      }),
      invalidatesTags: ["POST", "ADMIN_DASHBOARD"],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetAdminUsersQuery,
  useUpdateUserStatusMutation,
  useGetReportedContentQuery,
  useResolveReportMutation,
} = adminApi;
