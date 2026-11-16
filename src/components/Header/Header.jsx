import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logoHeader.svg";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import ButtonAccount from "./ButtonAccount/ButtonAccount";
import ButtonRegister from "./ButtonRegister/ButtonRegister";
import ButtonToEnter from "./ButtonToEnter/ButtonToEnter";
import "./Header.css";

const BASE_LINKS = [
  { label: "Início", to: "/", match: (p) => p === "/" },
  { label: "Explorar", to: "/explorar", match: (p) => p === "/explorar" },
  { label: "Roteiros", to: "/roteiros", match: (p) => p.startsWith("/roteiros") },
  { label: "Locais", to: "/local", match: (p) => p.startsWith("/local") },
  { label: "Comunidade", to: "/comunidade", match: (p) => p.startsWith("/comunidade") || p.startsWith("/blog") },
];

export default function Header() {
  const { user, logout } = useAuth();
  const { openModal } = useModal();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const legacyRoute = location.pathname.startsWith("/local") || location.pathname.startsWith("/roteiros");
  const navLinks =
    user?.role === "ADMIN"
      ? [...BASE_LINKS, { label: "Admin", to: "/admin", match: (p) => p.startsWith("/admin") }]
      : BASE_LINKS;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${legacyRoute ? "header--legacy" : ""} ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo Rota Cultural" className="header__logo-img" />
        </Link>

        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`header__link ${item.match(location.pathname) ? "header__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          {user ? (
            <>
              <ButtonAccount nome={user.nome || user.name || "Conta"} onClick={() => openModal("conta")} />
              <button
                type="button"
                className="header__logout"
                onClick={logout}
                title="Sair da conta"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <ButtonRegister onClick={() => openModal("cadastrar")} />
              <ButtonToEnter onClick={() => openModal("entrar")} />
            </>
          )}
        </div>

        <button
          id="burger"
          className="header__burger"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
