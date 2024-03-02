import { baseApi } from "./base-api";

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (args) => {
        const data = args;
        console.log("args", data);
        return {
          url: "books",
          params: data,
        };
      },
    }),
    getBookById: builder.query({
      query: ({ id }) => `books/${id}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookByIdQuery } = booksApi;
