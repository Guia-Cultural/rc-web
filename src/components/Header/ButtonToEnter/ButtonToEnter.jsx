import "./ButtonToEnter.css";

export default function ButtonToEnter({ onClick }) {
  return (
    <button
      className="button-to-enter"
      type="button"
      data-auth="login"
      onClick={onClick}
    >
      <span className="button-to-enter__text">Entrar</span>
    </button>
  );
}
