import { baseApi } from "@/redux/baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => ({
        url: "/posts",
        method: "GET",
        params,
      }),
      providesTags: ["POST"],
    }),

    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["POST"],
    }),
    getMyPosts: builder.query({
      query: (params) => ({
        url: "/posts/my-posts",
        method: "GET",
        params,
      }),

      providesTags: ["POST"],
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        data,
      }),
      invalidatesTags: ["POST"],
    }),

    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["POST"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
    }),

    likePost: builder.mutation({
      query: ({ id, reactionType }) => ({
        url: `/posts/${id}/reactions`,
        method: "POST",
        data: {
          reactionType,
        },
      }),
      invalidatesTags: ["POST"],
    }),

    reportPost: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/posts/${id}/report`,
        method: "POST",
        data: { reason },
      }),
      invalidatesTags: ["POST"],
    }),

    addComment: builder.mutation({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        data: { text },
      }),
      invalidatesTags: ["POST"],
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useReportPostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetMyPostsQuery,
} = postApi;
