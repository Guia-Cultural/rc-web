/* ==========================================================================
   COMPONENTE: Footer | Rodapé institucional e links de navegação.
   ========================================================================== */

import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
import ButtonFooter from "./ButtonFooter/ButtonFooter";
import ButtonContact from "./ButtonContact/ButtonContact";
import logoFooter from "../../assets/icons/logoFooter.svg";
import Instagram from "../../assets/icons/instaIcon.svg";
import WhatsApp from "../../assets/icons/zapIcon.svg";
import Facebook from "../../assets/icons/faceIcon.svg";
import { useModal } from "../../context/ModalContext";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "WhatsApp", href: "https://wa.me/", icon: WhatsApp },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
];

export default function Footer() {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__container-top">
          <p className="footer__txt">
            Sua próxima viagem
            <br />
            começa aqui.
          </p>
          <ButtonFooter onClick={() => navigate("/roteiros")} />
        </div>

        <div className="footer__container-middle">
          <Link to="/" className="footer__logo" aria-label="Rota Cultural - Sua viagem começa aqui">
            <img src={logoFooter} alt="Logo Rota Cultural do footer" className="footer__logo-img" />
          </Link>

          <div className="footer__line-vertical"></div>

          <div className="footer__institucional">
            <h5 className="footer__txt-institucional">Institucional</h5>
            <Link to="/#sobre" className="footer__link">
              Sobre nós
            </Link>
            <Link to="/#como-funciona" className="footer__link">
              Como funciona
            </Link>
            <button type="button" className="footer__link" onClick={() => openModal("contato")}>
              Contato
            </button>
          </div>

          <div className="footer__suporte">
            <h5 className="footer__txt-suporte">Suporte</h5>
            <button type="button" className="footer__link" onClick={() => openModal("faq")}>
              Perguntas frequentes
            </button>
            <button type="button" className="footer__link" onClick={() => openModal("ajuda")}>
              Central de ajuda
            </button>
            <button type="button" className="footer__link" onClick={() => openModal("termos")}>
              Termos de uso
            </button>
          </div>

          <div className="footer__contato">
            <ButtonContact onClick={() => openModal("contato")} />

            <div className="footer__redes-sociais">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="footer__rede-social"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={icon} alt="" className="footer__rede-social-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__line-dashed"></div>
        <div className="footer__container-bottom">
          <p className="footer__txt-copyright">
            © 2026 Rota Cultural. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
