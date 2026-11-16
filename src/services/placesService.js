import { apiRequest } from "./apiClient";

export const placesService = {
  getPublicPlaces(params = {}) {
    return apiRequest("/places", { params });
  },
  getPagedPlaces(params = {}) {
    return apiRequest("/places/paged", { params });
  },
  getMyPlaces() {
    return apiRequest("/places/my");
  },
  getAdminPlaces(status) {
    return apiRequest("/places/admin", {
      params: status ? { status } : undefined,
    });
  },
  getById(id) {
    return apiRequest(`/places/${id}`);
  },
  create(data) {
    return apiRequest("/places", {
      method: "POST",
      body: data,
    });
  },
  update(id, data) {
    return apiRequest(`/places/${id}`, {
      method: "PUT",
      body: data,
    });
  },
  updateStatus(id, status, rejectionReason = null) {
    return apiRequest(`/places/${id}/status`, {
      method: "PATCH",
      body: { status, rejectionReason },
    });
  },
  remove(id) {
    return apiRequest(`/places/${id}`, {
      method: "DELETE",
    });
  },
  listImages(placeId) {
    return apiRequest(`/places/${placeId}/images`);
  },
  uploadImages(placeId, files, cover = false) {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
    return apiRequest(`/places/${placeId}/images`, {
      method: "POST",
      params: { cover },
      body: formData,
    });
  },
  deleteImage(placeId, imageId) {
    return apiRequest(`/places/${placeId}/images/${imageId}`, {
      method: "DELETE",
    });
  },
};
