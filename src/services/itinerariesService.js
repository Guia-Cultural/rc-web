import { apiRequest } from "./apiClient";

export const itinerariesService = {
  generateForTrip(tripId, payload = {}) {
    return apiRequest(`/itineraries/generate/${tripId}`, {
      method: "POST",
      body: payload,
    });
  },
  getByTrip(tripId) {
    return apiRequest(`/itineraries/trip/${tripId}`);
  },
  getMyItineraries() {
    return apiRequest("/itineraries/me");
  },
  create(data) {
    return apiRequest("/itineraries", {
      method: "POST",
      body: data,
    });
  },
  remove(id) {
    return apiRequest(`/itineraries/${id}`, {
      method: "DELETE",
    });
  },
};
