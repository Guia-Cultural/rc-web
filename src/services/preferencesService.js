import { apiRequest } from "./apiClient";

export const preferencesService = {
  create(data) {
    return apiRequest("/preferences", {
      method: "POST",
      body: data,
    });
  },
  getByTrip(tripId) {
    return apiRequest(`/preferences/trip/${tripId}`);
  },
  remove(id) {
    return apiRequest(`/preferences/${id}`, {
      method: "DELETE",
    });
  },
};
