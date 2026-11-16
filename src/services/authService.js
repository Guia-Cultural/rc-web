import { apiRequest } from "./apiClient";

export const authService = {
  login(credentials) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: credentials,
      skipUnauthorizedEvent: true,
    });
  },
  me() {
    return apiRequest("/auth/me", {
      method: "GET",
      skipUnauthorizedEvent: true,
    });
  },
  register(payload) {
    return apiRequest("/user", {
      method: "POST",
      body: payload,
    });
  },
};
