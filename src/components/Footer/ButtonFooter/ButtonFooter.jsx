import "./ButtonFooter.css";
import seta from "../../../assets/icons/setaIcon.svg";


export default function ButtonFooter({ onClick }) {
  return (
    <button className="btn-footer" onClick={onClick}>
      <p className="btn-footer__txt">Criar meu roteiro</p>
      <img src={seta} alt="" className="btn-footer__icon" />
    </button>
  );
}
