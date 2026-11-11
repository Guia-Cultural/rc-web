import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logoHeader.svg";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import ButtonAccount from "./ButtonAccount/ButtonAccount";
import ButtonRegister from "./ButtonRegister/ButtonRegister";
import ButtonToEnter from "./ButtonToEnter/ButtonToEnter";
import "./Header.css";

const links = [
  { label: "Início", to: "/#inicio", section: "#inicio" },
  { label: "Destinos", to: "/#destinos", section: "#destinos" },
  { label: "Sobre Nós", to: "/#sobre-nos", section: "#sobre-nos" },
  { label: "Roteiros", to: "/roteiros", route: "/roteiros" },
  { label: "Momentos", to: "/#momentos", section: "#momentos" },
  { label: "Blogs", to: "/#blogs", section: "#blogs" },
  { label: "Recomendação", to: "/#recomendacao", section: "#recomendacao" },
];

export default function Header() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname === "/" ? "#inicio" : location.pathname);
  const legacyRoute = location.pathname === "/local" || location.pathname === "/roteiros";
  const visibleLinks = legacyRoute
    ? links.filter(({ label }) => ["Início", "Destinos", "Roteiros", "Sobre Nós", "Blogs"].includes(label))
    : links;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveLink(location.pathname);
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveLink(`#${entry.target.id}`)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(({ section }) => {
      const element = section ? document.querySelector(section) : null;
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  return <header className={`header ${legacyRoute ? "header--legacy" : ""} ${scrolled ? "header--scrolled" : ""}`}><div className="header__container">
    <Link to="/" className="header__logo"><img src={logo} alt="Logo Rota Cultural" className="header__logo-img" /></Link>
    <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>{visibleLinks.map(({ label, to, route, section }) => <Link key={to} to={to} className={`header__link ${activeLink === (route || section) ? "header__link--active" : ""}`} onClick={() => setMenuOpen(false)}>{label === "Início" && legacyRoute ? "Home" : label}</Link>)}</nav>
    <div className="header__actions">{user ? <ButtonAccount nome={user.nome} onClick={() => openModal("conta")} /> : <><ButtonRegister onClick={() => openModal("cadastrar")} /><ButtonToEnter onClick={() => openModal("entrar")} /></>}</div>
    <button className="header__burger" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>☰</button>
  </div></header>;
}
