// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const FAVOURITE_URL = "/favourite";

export const favouriteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFavourite: build.mutation({
      query: (favouriteData) => ({
        url: `${FAVOURITE_URL}`,
        method: "POST",
        data: favouriteData,
      }),
      invalidatesTags: [tagTypes.favourite, tagTypes.shortlist],
    }),
    getAllFavourites: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${FAVOURITE_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.favourite],
    }),
    getFavouriteById: build.query({
      query: (id) => ({
        url: `${FAVOURITE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.favourite],
    }),
    updateFavourite: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${FAVOURITE_URL}/${id}`,
        method: "PUT",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.favourite],
    }),
    deleteFavourite: build.mutation({
      query: (id) => ({
        url: `${FAVOURITE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.favourite, tagTypes.shortlist],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateFavouriteMutation,
  useGetAllFavouritesQuery,
  useGetFavouriteByIdQuery,
  useUpdateFavouriteMutation,
  useDeleteFavouriteMutation,
} = favouriteApi;
