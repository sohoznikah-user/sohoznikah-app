// File: src/redux/features/admin/proposalApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/proposals";

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProposal: build.mutation({
      query: (proposalData) => ({
        url: `${URL}`,
        method: "POST",
        data: proposalData,
      }),
      invalidatesTags: [tagTypes.proposal],
    }),
    getAllProposals: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.proposal],
    }),
    getProposalById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.proposal],
    }),
    getProposalByBiodataId: build.query({
      query: (biodataId) => ({
        url: `${URL}/biodata/${biodataId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.proposal],
    }),
    cancelProposal: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.proposal],
    }),
    updateProposal: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PUT",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.proposal],
    }),
    deleteProposal: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.proposal],
    }),
  }),
});

export const {
  useCreateProposalMutation,
  useGetAllProposalsQuery,
  useGetProposalByIdQuery,
  useGetProposalByBiodataIdQuery,
  useCancelProposalMutation,
  useUpdateProposalMutation,
  useDeleteProposalMutation,
} = proposalApi;
