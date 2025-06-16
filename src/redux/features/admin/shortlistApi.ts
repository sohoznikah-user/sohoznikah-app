// File: src/redux/features/admin/shortlistApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const SHORTLIST_URL = "/shortlist";

export const shortlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createShortlist: build.mutation({
      query: (shortlistData) => ({
        url: `${SHORTLIST_URL}`,
        method: "POST",
        data: shortlistData,
      }),
      invalidatesTags: [tagTypes.shortlist, tagTypes.favourite],
    }),
    getAllShortlists: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${SHORTLIST_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.shortlist],
    }),
    getShortlistById: build.query({
      query: (id) => ({
        url: `${SHORTLIST_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.shortlist],
    }),
    updateShortlist: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${SHORTLIST_URL}/${id}`,
        method: "PUT",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.shortlist],
    }),
    deleteShortlist: build.mutation({
      query: (id) => ({
        url: `${SHORTLIST_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shortlist, tagTypes.favourite],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateShortlistMutation,
  useGetAllShortlistsQuery,
  useGetShortlistByIdQuery,
  useUpdateShortlistMutation,
  useDeleteShortlistMutation,
} = shortlistApi;
