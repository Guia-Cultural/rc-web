import { apiRequest } from "./apiClient";

export const usersService = {
  getAll() {
    return apiRequest("/user");
  },
  getById(id) {
    return apiRequest(`/user/${id}`);
  },
  update(id, data) {
    return apiRequest(`/user/${id}`, {
      method: "PUT",
      body: data,
    });
  },
  updateRole(id, role) {
    return apiRequest(`/user/${id}/role`, {
      method: "PATCH",
      body: { role },
    });
  },
  remove(id) {
    return apiRequest(`/user/${id}`, {
      method: "DELETE",
    });
  },
};
