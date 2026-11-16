import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { clearStoredToken, getStoredToken, setStoredToken } from "../services/apiClient";
import { usersService } from "../services/usersService";

const AuthContext = createContext(null);

function normalizeUser(raw) {
  if (!raw) return null;
  const role = raw.role || "USUARIO";
  const tipo = role === "ADMIN" ? "admin" : role === "NATIVO" ? "morador" : "usuario";
  return {
    ...raw,
    nome: raw.name || raw.nome || "",
    role,
    tipo,
    nativeRequested: Boolean(raw.nativeRequested),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(() => Boolean(getStoredToken()));

  const syncLegacySession = useCallback((normalizedUser) => {
    try {
      if (normalizedUser) {
        localStorage.setItem(
          "rc_session",
          JSON.stringify({
            id: normalizedUser.id,
            name: normalizedUser.name,
            email: normalizedUser.email,
            role: normalizedUser.tipo,
          })
        );
      } else {
        localStorage.removeItem("rc_session");
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const logout = useCallback(() => {
    clearStoredToken();
    setToken(null);
    setUser(null);
    syncLegacySession(null);
  }, [syncLegacySession]);

  const refreshUser = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) {
      setUser(null);
      setLoading(false);
      return null;
    }
    try {
      const me = await authService.me();
      const normalized = normalizeUser(me);
      setUser(normalized);
      setToken(activeToken);
      syncLegacySession(normalized);
      return normalized;
    } catch {
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  }, [logout, syncLegacySession]);

  useEffect(() => {
    let active = true;
    const activeToken = getStoredToken();
    if (!activeToken) {
      return undefined;
    }
    authService
      .me()
      .then((me) => {
        if (!active) return;
        const normalized = normalizeUser(me);
        setUser(normalized);
        setToken(activeToken);
        syncLegacySession(normalized);
      })
      .catch(() => {
        if (active) logout();
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [logout, syncLegacySession]);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener("rc:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("rc:unauthorized", handleUnauthorized);
  }, [logout]);

  const login = useCallback(
    async (email, password) => {
      const resp = await authService.login({ email, password });
      setStoredToken(resp.token);
      setToken(resp.token);
      const normalized = normalizeUser(resp.user);
      setUser(normalized);
      syncLegacySession(normalized);
      return normalized;
    },
    [syncLegacySession]
  );

  const register = useCallback(
    async ({ name, email, password, cep, bio, requestNative }) => {
      await authService.register({
        name,
        email,
        password,
        cep: cep || null,
        bio: bio || null,
        role: requestNative ? "NATIVO" : "USUARIO",
        requestNative: Boolean(requestNative),
      });
      return login(email, password);
    },
    [login]
  );

  const updateProfile = useCallback(
    async (payload) => {
      if (!user?.id) {
        throw new Error("Usuário não autenticado.");
      }
      const updated = await usersService.update(user.id, payload);
      const normalized = normalizeUser(updated);
      setUser(normalized);
      syncLegacySession(normalized);
      return normalized;
    },
    [syncLegacySession, user]
  );

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
