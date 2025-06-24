// File: src/redux/features/admin/biodataApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const BIODATA_URL = "/biodata";

export const biodataApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBiodata: build.mutation({
      query: (biodataData) => ({
        url: `${BIODATA_URL}`,
        method: "POST",
        data: biodataData,
      }),
      invalidatesTags: [tagTypes.biodata],
    }),
    requestDeleteBiodata: build.mutation({
      query: (deleteData) => ({
        url: `${BIODATA_URL}/delete-request`,
        method: "POST",
        data: deleteData,
      }),
      invalidatesTags: [tagTypes.biodata],
    }),
    getAllBiodatas: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${BIODATA_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.biodata],
    }),
    getBiodatasByAdmin: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${BIODATA_URL}/all`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.biodata],
    }),
    getBiodataById: build.query({
      query: (id) => ({
        url: `${BIODATA_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.biodata],
    }),
    getMyBiodata: build.query({
      query: () => ({
        url: `${BIODATA_URL}/my-biodata`,
        method: "GET",
      }),
      providesTags: [tagTypes.biodata],
    }),
    getBiodataByIdByAdmin: build.query({
      query: (id) => ({
        url: `${BIODATA_URL}/${id}/admin`,
        method: "GET",
      }),
      providesTags: [tagTypes.biodata],
    }),
    markSeen: build.mutation<void, string>({
      query: (id) => ({
        url: `/biodata/${id}/seen`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.biodata],
    }),

    updateMyBiodata: build.mutation({
      query: (updatedData) => ({
        url: `${BIODATA_URL}/my-biodata`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.biodata],
    }),
    updateBiodataStatus: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${BIODATA_URL}/${id}/status`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.biodata],
    }),
    updateBiodata: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${BIODATA_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.biodata],
    }),
    deleteBiodata: build.mutation({
      query: (id) => ({
        url: `${BIODATA_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.biodata],
    }),
    getBiodataAnalytics: build.query({
      query: () => ({
        url: `${BIODATA_URL}/analytics`,
        method: "GET",
      }),
      providesTags: [tagTypes.biodata],
    }),
  }),
});

export const {
  useCreateBiodataMutation,
  useGetAllBiodatasQuery,
  useGetBiodatasByAdminQuery,
  useGetBiodataByIdQuery,
  useGetBiodataByIdByAdminQuery,
  useGetMyBiodataQuery,
  useMarkSeenMutation,
  useUpdateMyBiodataMutation,
  useUpdateBiodataStatusMutation,
  useUpdateBiodataMutation,
  useDeleteBiodataMutation,
  useRequestDeleteBiodataMutation,
  useGetBiodataAnalyticsQuery,
} = biodataApi;
