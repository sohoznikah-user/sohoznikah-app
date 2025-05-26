// File: src/redux/features/admin/contactApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const CONTACT_URL = "/contact";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContact: build.mutation({
      query: (contactData) => ({
        url: `${CONTACT_URL}`,
        method: "POST",
        data: contactData,
      }),
      invalidatesTags: [tagTypes.contact],
    }),
    getAllContacts: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${CONTACT_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.contact],
    }),
    getContactById: build.query({
      query: (id) => ({
        url: `${CONTACT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
    }),
    updateContact: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${CONTACT_URL}/${id}`,
        method: "PUT",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.contact],
    }),
    deleteContact: build.mutation({
      query: (id) => ({
        url: `${CONTACT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.contact],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
