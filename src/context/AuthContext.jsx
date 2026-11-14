/* ==========================================================================
   CONTEXTO DE AUTENTICAÇÃO | Estado global da sessão do usuário.
   ========================================================================== */

import { createContext, useContext, useState } from "react";

// ==========================================================================
//    CONTEXT DE LOGIN
//    É um "armário" que guarda quem está logado. Qualquer componente do site
//    consegue abrir esse armário, sem precisar receber nada por props.
// ==========================================================================
const AuthContext = createContext(null);

// ==========================================================================
//    PROVIDER (o "dono do armário")
//    - envolve o site inteiro (veja o main.jsx)
//    - user começa como null, que significa visitante (ninguém logado)
//    - depois de logar, user vira { nome: "Ana", tipo: "usuario" }
//      e o tipo pode ser: "usuario", "morador" ou "admin"
// ==========================================================================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Guarda os dados de quem acabou de entrar ou se cadastrar
  const login = (dadosDoUsuario) => setUser(dadosDoUsuario);

  // Volta a ser visitante
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================================================
//    HOOK useAuth
//    Atalho para abrir o armário. Em qualquer componente:
//    const { user, login, logout } = useAuth();
// ==========================================================================
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
