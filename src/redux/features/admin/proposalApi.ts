// File: src/redux/features/admin/proposalApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const PROPOSAL_URL = "/proposal";

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProposal: build.mutation({
      query: (proposalData) => ({
        url: `${PROPOSAL_URL}`,
        method: "POST",
        data: proposalData,
      }),
      invalidatesTags: [tagTypes.proposal],
    }),
    getAllProposals: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PROPOSAL_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.proposal],
    }),
    getProposalById: build.query({
      query: (id) => ({
        url: `${PROPOSAL_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.proposal],
    }),
    updateProposal: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${PROPOSAL_URL}/${id}`,
        method: "PUT",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.proposal],
    }),
    deleteProposal: build.mutation({
      query: (id) => ({
        url: `${PROPOSAL_URL}/${id}`,
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
  useUpdateProposalMutation,
  useDeleteProposalMutation,
} = proposalApi;
