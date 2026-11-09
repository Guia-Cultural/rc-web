import "./ButtonContact.css";
import aviao from "../../../assets/icons/aviaoIcon.svg";

export default function ButtonContact({ onClick }) {
  return (
    <button className="btn-contact" onClick={onClick}>
      <img src={aviao} alt="" className="btn-contact__icon" />
      <p className="btn-contact__txt">Fale Conosco</p>
    </button>
  );
}
