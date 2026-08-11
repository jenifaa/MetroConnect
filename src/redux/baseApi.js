import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER", "POST", "QUESTION", "LOST_FOUND", "COMPLAINT", "ANNOUNCEMENT", "NOTIFICATION", "ADMIN_DASHBOARD"],
  endpoints: () => ({}),
});
