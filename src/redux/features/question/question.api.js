import { baseApi } from "@/redux/baseApi";

export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (params) => ({
        url: "/questions",
        method: "GET",
        params,
      }),
      providesTags: ["QUESTION"],
    }),

    getQuestionById: builder.query({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "GET",
      }),
      providesTags: ["QUESTION"],
    }),
    getMyQuestions: builder.query({
      query: (params) => ({ url: "/questions/me", method: "GET", params }),
      providesTags: ["QUESTION"],
    }),

    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/questions",
        method: "POST",
        data,
      }),
      invalidatesTags: ["QUESTION"],
    }),

    updateQuestion: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/questions/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["QUESTION"],
    }),

    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QUESTION"],
    }),

    addAnswer: builder.mutation({
      query: ({ id, content }) => ({
        url: `/questions/${id}/comments`,
        method: "POST",
        data: { content },
      }),
      invalidatesTags: ["QUESTION"],
    }),

    upvoteAnswer: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/upvote`,
        method: "POST",
      }),
      invalidatesTags: ["QUESTION"],
    }),
    updateQuestionStatus: builder.mutation({
      query: ({ id, isSolved }) => ({
        url: `/questions/${id}/solved`,
        method: "PATCH",
        data: { isSolved },
      }),
      invalidatesTags: ["QUESTION"],
    }),
    deleteAnswer: builder.mutation({
      query: ({ id, commentId }) => ({
        url: `/questions/${id}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QUESTION"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useAddAnswerMutation,
  useUpvoteAnswerMutation,
  useDeleteAnswerMutation,
  useUpdateQuestionStatusMutation,
  useGetMyQuestionsQuery,
} = questionApi;
