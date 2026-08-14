import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create",
        method: "POST",
        data: userInfo,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    updateUserProfile: builder.mutation({
      query: ({ data }) => ({
        url: "/user/profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),

    searchUsers: builder.query({
      query: (query) => ({
        url: "/user/search",
        method: "GET",
        params: { query },
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,

  useUserInfoQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,

  useUpdateUserProfileMutation,

  useResetPasswordMutation,
  useChangePasswordMutation,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useDeleteUserMutation,
} = authApi;
