import "./ButtonRegister.css";
import registerIcon from "../../../assets/icons/userIcon.svg"; // Certifique-se de que o caminho está correto

export default function ButtonRegister(OnClick) {
  return (
    <button className="btn-register" onClick={OnClick}>
      <img src={registerIcon} alt="Icone de cadastro" className="btn-register-icon" />
      <p className="btn-register-text">Cadastrar</p>
    </button>
  );
}
