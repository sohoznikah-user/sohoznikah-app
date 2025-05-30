// File: src/redux/features/admin/notificationApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const NOTIFICATION_URL = "/notification";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNotification: build.mutation({
      query: (notificationData) => ({
        url: `${NOTIFICATION_URL}`,
        method: "POST",
        data: notificationData,
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    getAllNotifications: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${NOTIFICATION_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.notification],
    }),
    getNotificationById: build.query({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
    updateNotification: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${NOTIFICATION_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    deleteNotification: build.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetAllNotificationsQuery,
  useGetNotificationByIdQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
