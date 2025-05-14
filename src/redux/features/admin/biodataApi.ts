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
    getAllBiodatas: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${BIODATA_URL}`,
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
    updateBiodata: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${BIODATA_URL}/${id}`,
        method: "PUT",
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
  }),
});

export const {
  useCreateBiodataMutation,
  useGetAllBiodatasQuery,
  useGetBiodataByIdQuery,
  useUpdateBiodataMutation,
  useDeleteBiodataMutation,
} = biodataApi;
