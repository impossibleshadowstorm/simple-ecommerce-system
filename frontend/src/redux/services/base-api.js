import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const emptyApi = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const baseApi = emptyApi.enhanceEndpoints({
  addTagTypes: ["login", "books"],
});
