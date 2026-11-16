import { apiRequest } from "./apiClient";

export const favoritesService = {
  getMyFavorites() {
    return apiRequest("/favorites/me");
  },
  add(locId) {
    return apiRequest("/favorites", {
      method: "POST",
      body: { locId },
    });
  },
  removeByPlace(locId) {
    return apiRequest(`/favorites/place/${locId}`, {
      method: "DELETE",
    });
  },
};
