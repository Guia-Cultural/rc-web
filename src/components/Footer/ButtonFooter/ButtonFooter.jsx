import "./ButtonFooter.css";
import seta from "../../../assets/icons/setaIcon.svg";

export default function ButtonFooter({ onClick }) {
  return (
    <button type="button" className="button-footer" onClick={onClick}>
      <p className="button-footer__text">Criar meu roteiro</p>
      <img src={seta} alt="" className="button-footer__icon" />
    </button>
  );
}
