// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/token";

export const tokenApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createToken: build.mutation({
      query: (tokenData) => ({
        url: `${URL}`,
        method: "POST",
        data: tokenData,
      }),
      invalidatesTags: [tagTypes.token],
    }),
    getAllTokens: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.token],
    }),
    getTokenById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.token],
    }),
    updateToken: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.token],
    }),
    deleteToken: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.token],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateTokenMutation,
  useGetAllTokensQuery,
  useGetTokenByIdQuery,
  useUpdateTokenMutation,
  useDeleteTokenMutation,
} = tokenApi;
