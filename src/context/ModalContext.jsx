/* ==========================================================================
   CONTEXTO DE MODAIS | Controle compartilhado de abertura e fechamento.
   ========================================================================== */

import { createContext, useContext, useState } from "react";

// ==========================================================================
//    CONTEXT DOS MODAIS
//    Guarda qual modal está aberto agora. Assim qualquer lugar do site
//    (header, footer, botão de avaliar, seção de roteiros) abre um modal
//    chamando openModal("nome-do-modal").
// ==========================================================================
const ModalContext = createContext(null);

// ==========================================================================
//    PROVIDER
//    - modalAberto é o nome do modal aberto ("entrar", "cadastrar", "conta"...)
//      ou null quando não tem nenhum aberto
// ==========================================================================
export function ModalProvider({ children }) {
  const [modalAberto, setModalAberto] = useState(null);

  const openModal = (nome) => setModalAberto(nome);
  const closeModal = () => setModalAberto(null);

  return (
    <ModalContext.Provider value={{ modalAberto, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

// ==========================================================================
//    HOOK useModal
//    const { modalAberto, openModal, closeModal } = useModal();
// ==========================================================================
// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
  return useContext(ModalContext);
}
