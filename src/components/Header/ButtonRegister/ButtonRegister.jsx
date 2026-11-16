import "./ButtonRegister.css";
import registerIcon from "../../../assets/icons/userIcon.svg";

export default function ButtonRegister({ onClick }) {
  return (
    <button
      className="button-register"
      type="button"
      data-auth="register"
      onClick={onClick}
    >
      <img src={registerIcon} alt="" className="button-register__icon" />
      <span className="button-register__text">Cadastrar</span>
    </button>
  );
}
