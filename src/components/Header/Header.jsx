// src/components/Header/Header.jsx
import { useEffect, useState } from "react";
import logo from "../../assets/icons/logoHeader.svg";
import ButtonRegister from "./ButtonRegister/ButtonRegister";
import ButtonToEnter from "./ButtonToEnter/ButtonToEnter";
import ButtonAccount from "./ButtonAccount/ButtonAccount";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import "./Header.css";

// ==========================================================================
//    LINKS DO MENU
// ==========================================================================
const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Destinos", href: "#destinos" },
  { label: "Sobre Nós", href: "#sobre-nos" },
  { label: "Roteiros", href: "#roteiros" },
  { label: "Momentos", href: "#momentos" },
  { label: "Blogs", href: "#blogs" },
  { label: "Recomendação", href: "#recomendacao" },
];

// ==========================================================================
//    COMPONENTE HEADER
//    Não recebe props: pega o que precisa direto dos Contexts
//    - user: dados de quem está logado (ex.: { nome: "Ana", tipo: "usuario" })
//            ou null quando for visitante
//    - openModal: função que abre um modal (recebe o nome do modal)
// ==========================================================================
export default function Header() {
  // --------------------------------------------------------------------------
  //    DADOS VINDOS DOS CONTEXTS
  // --------------------------------------------------------------------------
  const { user } = useAuth();
  const { openModal } = useModal();

  // --------------------------------------------------------------------------
  //    ESTADOS
  // --------------------------------------------------------------------------

  // Controla se o menu do celular está aberto ou fechado
  const [menuOpen, setMenuOpen] = useState(false);

  // Fica true quando o usuário já rolou a página (liga a sombra da barra)
  const [scrolled, setScrolled] = useState(false);

  // Guarda qual link está ativo agora (começa no Início)
  const [activeLink, setActiveLink] = useState("#inicio");

  // --------------------------------------------------------------------------
  //    SOMBRA DA BARRA AO ROLAR A PÁGINA
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpeza: remove o fofoqueiro quando o componente sair da tela
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------------------------------------------------------
  //    LINK ATIVO AUTOMÁTICO
  // --------------------------------------------------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    NAV_LINKS.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__container">
        {/* ==========================================================================
            SEÇÃO 1: LOGOTIPO 
        ========================================================================== */}
        <a href="#inicio" className="header__logo">
          <img
            src={logo}
            alt="Logo Rota Cultural"
            className="header__logo-img"
          />
        </a>

        {/* ==========================================================================
            SEÇÃO 2: NAVEGAÇÃO 
        ========================================================================== */}
        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`header__link ${activeLink === href ? "header__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ==========================================================================
            SEÇÃO 3: AÇÕES (muda conforme o usuário está logado ou não)
        ========================================================================== */}
        <div className="header__actions">
          {user ? (
            <ButtonAccount
              nome={user.nome}
              onClick={() => openModal("conta")}
            />
          ) : (
            <>
              <ButtonRegister onClick={() => openModal("cadastrar")} />
              <ButtonToEnter onClick={() => openModal("entrar")} />
            </>
          )}
        </div>

        {/* ==========================================================================
            SEÇÃO 4: BOTÃO HAMBÚRGUER 
        ========================================================================== */}
        <button
          className="header__burger"
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
