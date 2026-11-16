/* ==========================================================================
   COMPONENTE: ButtonContact | Botão de contato do rodapé.
   ========================================================================== */

import "./ButtonContact.css";
import aviao from "../../../assets/icons/aviaoIcon.svg";

export default function ButtonContact({ onClick }) {
  return (
    <button className="button-contact" type="button" data-dlg="contact" onClick={onClick}>
      <img src={aviao} alt="" className="button-contact__icon" />
      <p className="button-contact__text">Fale Conosco</p>
    </button>
  );
}
