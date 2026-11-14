/* ==========================================================================
   COMPONENTE: Footer | Rodapé institucional e links de navegação.
   ========================================================================== */

import "./Footer.css";
import ButtonFooter from "./ButtonFooter/ButtonFooter";
import ButtonContact from "./ButtonContact/ButtonContact";
import logoFooter from "../../assets/icons/logoFooter.svg";
import Instagram from "../../assets/icons/instaIcon.svg";
import WhatsApp from "../../assets/icons/zapIcon.svg";
import Facebook from "../../assets/icons/faceIcon.svg";

/* ==========================================================================
   Redes sociais
========================================================================== */
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "WhatsApp", href: "https://wa.me/", icon: WhatsApp },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/*==================================================
        Conteúdo do topo
        ================================================= */}
        <div className="footer__container-top">
          <p className="footer__txt">
            Sua próxima viagem
            <br />
            começa aqui.
          </p>
          <ButtonFooter />
        </div>

        {/*==================================================
        Conteúdo do meio
        ================================================= */}
        <div className="footer__container-middle">
          
          <a
            href="#inicio"
            className="footer__logo"
            aria-label="Rota Cultural - Sua viagem começa aqui"
          >
            <img
              src={logoFooter}
              alt="Logo Rota Cultural do footer"
              className="footer__logo-img"
            />
          </a>

          {/* Linha amarela que separa a logo das colunas */}
          <div className="footer__line-vertical"></div>

          {/* Coluna Institucional */}
          <div className="footer__institucional">
            <h5 className="footer__txt-institucional">Institucional</h5>
            <a href="#sobre" className="footer__link">
              Sobre nós
            </a>
            <a href="#como-funciona" className="footer__link">
              Como funciona
            </a>
            <button type="button" className="footer__link" data-dlg="contact">
              Contato
            </button>
          </div>

          {/* Coluna Suporte */}
          <div className="footer__suporte">
            <h5 className="footer__txt-suporte">Suporte</h5>
            <button type="button" className="footer__link" data-dlg="faq">
              Perguntas frequentes
            </button>
            <button type="button" className="footer__link" data-dlg="help">
              Central de ajuda
            </button>
            <button type="button" className="footer__link" data-dlg="terms">
              Termos de uso
            </button>
          </div>

          {/* Contato: botão Fale Conosco + redes sociais */}
          <div className="footer__contato">
            <ButtonContact />

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

        {/*==================================================
        Conteúdo do rodapé (copyright)
        ================================================= */}
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
