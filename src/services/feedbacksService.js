import { apiRequest } from "./apiClient";

export const feedbacksService = {
  getByPlace(locId) {
    return apiRequest(`/feedbacks/place/${locId}`);
  },
  create(data) {
    return apiRequest("/feedbacks", {
      method: "POST",
      body: data,
    });
  },
  update(id, data) {
    return apiRequest(`/feedbacks/${id}`, {
      method: "PUT",
      body: data,
    });
  },
  remove(id) {
    return apiRequest(`/feedbacks/${id}`, {
      method: "DELETE",
    });
  },
};
