/* ==========================================================================
   COMPONENTE: ButtonFooter | Chamada de ação para criação de roteiro.
   ========================================================================== */

import "./ButtonFooter.css";
import seta from "../../../assets/icons/setaIcon.svg";


export default function ButtonFooter({ onClick }) {
  return (
    <a className="button-footer" href="#plano" onClick={onClick}>
      <p className="button-footer__text">Criar meu roteiro</p>
      <img src={seta} alt="" className="button-footer__icon" />
    </a>
  );
}
