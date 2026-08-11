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
        url: `/questions/${id}/answers`,
        method: "POST",
        data: { content },
      }),
      invalidatesTags: ["QUESTION"],
    }),

    upvoteAnswer: builder.mutation({
      query: (id) => ({
        url: `/answers/${id}/upvote`,
        method: "POST",
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
} = questionApi;
