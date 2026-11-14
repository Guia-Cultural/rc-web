/* ==========================================================================
   DADOS DO MODAL DE CONTA | Abas disponíveis por tipo de usuário.
   ========================================================================== */
// ==========================================================================
//    ABAS DO MODAL DA CONTA
//    - id: nome interno da aba
//    - label: texto que aparece na barra lateral do modal
//    - cada tipo de conta usa as abas em comum e soma as suas
//      (o "..." copia os itens de uma lista para dentro de outra)
// ==========================================================================
// Abas que todo mundo logado tem (todas, menos a Segurança, que fica sempre por último)
const BASE_TABS = [
    { id: "meus-dados", label: "Meus dados" },
    { id: "favoritos", label: "Favoritos" },
    { id: "meus-roteiros", label: "Meus roteiros" },
    { id: "atividades", label: "Atividades" },
    { id: "plano-de-viagem", label: "Plano de viagem" },
    { id: "conhecer", label: "Conhecer" },
];
// Abas soltas, escritas uma vez só e reaproveitadas nas listas de baixo
const MEUS_LOCAIS = { id: "meus-locais", label: "Meus locais" };
const AREA_ADMIN = { id: "area-do-administrador", label: "Área do administrador" };
const SEGURANCA = { id: "seguranca", label: "Segurança" };
// ==========================================================================
//    LISTA FINAL POR TIPO DE CONTA
//    O modal escolhe a lista com: ACCOUNT_TABS[user.tipo]
// ==========================================================================
export const ACCOUNT_TABS = {
    usuario: [...BASE_TABS, SEGURANCA],
    morador: [...BASE_TABS, MEUS_LOCAIS, SEGURANCA],
    admin: [...BASE_TABS, MEUS_LOCAIS, AREA_ADMIN, SEGURANCA],
};
