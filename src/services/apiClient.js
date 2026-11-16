export const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081").replace(/\/$/, "");

export const TOKEN_STORAGE_KEY = "rc_token";

export class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // ignore storage quota errors
  }
}

export function clearStoredToken() {
  setStoredToken(null);
}

export function resolveAssetUrl(url) {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return `${API_BASE_URL}${url}`;
  }
  return url;
}

const DEFAULT_STATUS_MESSAGES = {
  400: "Dados inválidos enviados na requisição.",
  401: "Sua sessão expirou ou as credenciais são inválidas.",
  403: "Você não tem permissão para realizar esta operação.",
  404: "Recurso não encontrado.",
  409: "Conflito de dados: este registro já existe.",
  500: "Erro interno no servidor. Tente novamente em instantes.",
};

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, headers = {}, params, skipUnauthorizedEvent = false } = options;

  let url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  if (params && typeof params === "object") {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        search.set(key, String(value));
      }
    });
    const qs = search.toString();
    if (qs) {
      url += `?${qs}`;
    }
  }

  const finalHeaders = {
    Accept: "application/json",
    ...headers,
  };

  const token = getStoredToken();
  if (token && !finalHeaders.Authorization) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  let finalBody = body;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (body !== undefined && body !== null && !isFormData && typeof body !== "string") {
    finalHeaders["Content-Type"] = "application/json";
    finalBody = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: finalBody,
    });
  } catch {
    throw new ApiError(
      "Não foi possível conectar ao servidor da API. Verifique se o backend está em execução.",
      0
    );
  }

  const contentType = response.headers.get("content-type") || "";
  let parsed = null;
  if (response.status !== 204) {
    const text = await response.text();
    if (text) {
      if (contentType.includes("application/json")) {
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = { message: text };
        }
      } else {
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }
      }
    }
  }

  if (!response.ok) {
    if (response.status === 401 && !skipUnauthorizedEvent && !path.includes("/auth/login")) {
      clearStoredToken();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("rc:unauthorized"));
      }
    }
    const serverMessage =
      typeof parsed === "string"
        ? parsed
        : parsed?.message || parsed?.error || DEFAULT_STATUS_MESSAGES[response.status] || "Erro na requisição.";
    const fieldErrors = typeof parsed === "object" && parsed !== null ? parsed.errors || null : null;
    throw new ApiError(serverMessage, response.status, fieldErrors);
  }

  return parsed;
}
