import { apiRequest } from "./apiClient";

export const recommendationsService = {
  getForTrip(tripId) {
    return apiRequest(`/recommendations/trip/${tripId}`);
  },
  preview(data) {
    return apiRequest("/recommendations/preview", {
      method: "POST",
      body: data,
    });
  },
};
