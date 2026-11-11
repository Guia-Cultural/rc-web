import "./ButtonToEnter.css";

export default function ButtonToEnter({ onClick }) {
    return (
        <button className="btn-to-enter" onClick={onClick}>
            <p className="btn-to-enter-text">Entrar</p>
        </button>
    );
}
