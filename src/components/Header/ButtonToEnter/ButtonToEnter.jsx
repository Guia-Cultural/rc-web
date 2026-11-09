import "./ButtonToEnter.css";

export default function ButtonToEnter(OnClick) {
    return (
        <button className="btn-to-enter" onClick={OnClick}>
            <p className="btn-to-enter-text">Entrar</p>
        </button>
    );
}