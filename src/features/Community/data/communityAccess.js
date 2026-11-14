/* ==========================================================================
   CONTROLE DE ACESSO DA COMUNIDADE
   Perfis aceitos: viajante, morador local/nativo e administrador nativo.
========================================================================== */

const ROLE_ALIASES = {
  usuario: "usuario",
  viajante: "usuario",
  morador: "morador",
  "morador-local": "morador",
  nativo: "morador",
  admin: "admin",
  "admin-nativo": "admin",
  administrador: "admin",
  "administrador-nativo": "admin",
};

export function canAccessCommunity(user) {
  const role = String(user?.tipo || user?.role || user?.perfil || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

  return Boolean(ROLE_ALIASES[role]);
}
