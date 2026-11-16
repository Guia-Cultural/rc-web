import { apiRequest } from "./apiClient";

export const tripsService = {
  create(data) {
    return apiRequest("/trip", {
      method: "POST",
      body: data,
    });
  },
  getMyTrips() {
    return apiRequest("/trip/me");
  },
  getAll() {
    return apiRequest("/trip");
  },
  getById(id) {
    return apiRequest(`/trip/${id}`);
  },
  update(id, data) {
    return apiRequest(`/trip/${id}`, {
      method: "PUT",
      body: data,
    });
  },
  remove(id) {
    return apiRequest(`/trip/${id}`, {
      method: "DELETE",
    });
  },
};
