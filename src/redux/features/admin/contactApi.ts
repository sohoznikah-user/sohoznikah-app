// File: src/redux/features/admin/proposalApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/contacts";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContact: build.mutation({
      query: (contactData) => ({
        url: `${URL}`,
        method: "POST",
        data: contactData,
      }),
      invalidatesTags: [tagTypes.contact],
    }),
    getAllContacts: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.contact],
    }),
    getContactByBiodataId: build.query({
      query: (biodataId) => ({
        url: `${URL}/biodata/${biodataId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
    }),
    getContactById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
    }),

    updateContact: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.contact],
    }),
    deleteContact: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.contact],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
  useGetContactByBiodataIdQuery,
  useGetContactByIdQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
