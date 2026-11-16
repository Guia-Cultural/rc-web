/* ==========================================================================
   COMPONENTE: Momentos
   Responsabilidade: estrutura visual da seção original da Home.
   Classes BEM com estilos centralizados no CSS do componente.
   Interações da seção permanecem na feature Visit.
========================================================================== */
import MomentosInlineImage1 from "../../../assets/images/home/home-momentos-gallery-01.jpg";
import MomentosInlineImage2 from "../../../assets/images/home/home-momentos-gallery-02.jpg";
import MomentosInlineImage3 from "../../../assets/images/home/home-momentos-gallery-03.jpg";
import "./Momentos.css";

export default function Momentos() {
  return (
    <>
      {/* ==========================================================================
         SEÇÃO 1: MARCAÇÃO DA SEÇÃO MOMENTOS
      ========================================================================== */}
<section className="momentos section" id="momentos"><div className="layout-container"><div className="momentos__grid"><div className="section-heading reveal"><span className="badge"><svg className="icon" aria-hidden="true"><use href="#i-users"></use></svg>Para inspirar</span><h2 className="section-title"><span className="text-highlight">Descubra</span> o mundo em <span className="text-highlight">novos ângulos</span></h2><p className="section-description">Assista a vídeos incríveis e comece a imaginar a sua próxima aventura, com destinos que inspiram, encantam e esperam por você.</p><a className="button" href="#plano">Planeje sua próxima aventura <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></div>
<div className="momentos__gallery reveal"><svg className="momentos__background-shape" viewBox="0 0 600 470" aria-hidden="true"><path className="momentos__background-path" d="M70 170C60 90 150 30 250 28C380 24 520 20 575 120C610 190 560 290 500 380C470 425 420 445 380 440C300 430 200 370 130 300C90 258 72 220 70 170Z"></path></svg><img className="momentos__image--one" src={MomentosInlineImage1} alt="Macacos fazendo selfie com o mar ao fundo" /><img className="momentos__image--two" src={MomentosInlineImage2} alt="Dunas brancas e lagoa azul dos Lençóis Maranhenses" /><img className="momentos__image--three" src={MomentosInlineImage3} alt="Vacas fazendo selfie em um campo ao pôr do sol" /><img className="momentos__image--four" data-i="x-street" alt="Rua colonial colorida" /></div></div>
<button className="momentos__video reveal" id="vid" aria-label="Assistir ao tour em vídeo"><img data-i="x-poster" alt="" /><span className="momentos__play-button"><svg className="icon" aria-hidden="true"><use href="#i-play"></use></svg></span></button></div></section>
{/* ==========================================================================
         FAIXA DECORATIVA / MARQUEE
      ========================================================================== */}
<div className="marquee marquee--magenta" aria-hidden="true"><div className="marquee__track"><span>Mais que viagens</span><span>Experiências</span><span>Histórias reais</span><span>Cultura viva</span><span>Gente de todo canto</span><span>Brasil</span><span>Mais que viagens</span><span>Experiências</span><span>Histórias reais</span><span>Cultura viva</span><span>Gente de todo canto</span><span>Brasil</span></div></div>
    </>
  );
}
