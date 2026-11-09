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
            <a href="#contato" className="footer__link">
              Contato
            </a>
          </div>

          {/* Coluna Suporte */}
          <div className="footer__suporte">
            <h5 className="footer__txt-suporte">Suporte</h5>
            <a href="#perguntas-frequentes" className="footer__link">
              Perguntas frequentes
            </a>
            <a href="#central-de-ajuda" className="footer__link">
              Central de ajuda
            </a>
            <a href="#termos-de-uso" className="footer__link">
              Termos de uso
            </a>
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
