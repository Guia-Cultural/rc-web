/* ==========================================================================
   COMPONENTE: ButtonAccount | Botão de acesso ao menu da conta.
   ========================================================================== */

import "./ButtonAccount.css";

// ==========================================================================
//    COMPONENTE BUTTON ACCOUNT
//    Props:
//    - nome: nome que aparece no botão
//    - onClick: o que acontece ao clicar (o Header manda abrir o modal da conta)
// ==========================================================================
export default function ButtonAccount({ nome, onClick }) {
  // Pega só a primeira letra do nome para a bolinha (ex.: "Morador Demo" vira "M")
  const inicial = nome.charAt(0).toUpperCase();

  return (
    <button
      className="button-account"
      onClick={onClick}
      aria-label={`Abrir conta de ${nome}`}
    >
      <span className="button-account__avatar">{inicial}</span>
      <p className="button-account__text">{nome}</p>
    </button>
  );
}
