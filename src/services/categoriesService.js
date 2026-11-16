import { apiRequest } from "./apiClient";

export const categoriesService = {
  getAll() {
    return apiRequest("/categories");
  },
  getById(id) {
    return apiRequest(`/categories/${id}`);
  },
  create(data) {
    return apiRequest("/categories", {
      method: "POST",
      body: data,
    });
  },
  update(id, data) {
    return apiRequest(`/categories/${id}`, {
      method: "PUT",
      body: data,
    });
  },
  remove(id) {
    return apiRequest(`/categories/${id}`, {
      method: "DELETE",
    });
  },
};
