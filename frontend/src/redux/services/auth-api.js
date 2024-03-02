import { baseApi } from "./base-api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
