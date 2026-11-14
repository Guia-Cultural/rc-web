/* ==========================================================================
   COMPONENTE: ButtonToEnter | Acesso à autenticação de usuário.
   ========================================================================== */

import "./ButtonToEnter.css";

export default function ButtonToEnter() {
  return (
    <button className="button-to-enter" type="button" data-auth="login">
      <span className="button-to-enter__text">Entrar</span>
    </button>
  );
}
