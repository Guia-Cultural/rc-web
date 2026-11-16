/* ==========================================================================
   COMPONENTE: Hero
   Responsabilidade: estrutura visual da seção original da Home.
   Classes BEM e estilos inline específicos preservados.
   Interações da seção permanecem na feature Visit.
========================================================================== */
import "./Hero.css";

export default function Hero() {
  return (
    <>
      {/* ==========================================================================
         SEÇÃO 1: MARCAÇÃO DA SEÇÃO HERO
      ========================================================================== */}
<section className="hero" id="inicio"><div className="layout-container hero__grid"><div>
<h1 className="hero__title">Descubra o Brasil <span className="text-highlight">do seu jeito</span></h1><p className="section-description hero__description" id="hsub"></p>
<div className="hero__themes" id="themes"><b>Escolha o seu clima</b></div>
<form className="hero__search" id="hs" role="search"><input id="hq" placeholder="Para onde você quer ir?" aria-label="Buscar destino" /><button className="button" type="submit"><svg className="icon" aria-hidden="true"><use href="#i-search"></use></svg>Buscar</button></form>
<div className="hero__actions"><a className="button button--blue" href="#explorar">Explorar <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a><a className="button button--ghost" href="#locais">Ver destinos</a></div></div>
<div className="hero__stage reveal"><i className="hero__shape"></i><figure><div className="hero__media"><img id="hi1" alt="" className="hero__image--active" /><img id="hi2" alt="" className="hero__image--inactive" /><div className="hero__segments" id="hseg"><i></i><i></i><i></i><i></i><i></i></div></div>
<figcaption id="hcap" tabIndex={0} role="button" aria-label="Ver detalhes do local em destaque"><span className="hero__caption-meta"><span className="hero__caption-tag" id="hct"></span></span><b id="hn"></b><span className="hero__caption-footer"><span className="hero__location"><svg className="icon" aria-hidden="true"><use href="#i-pin"></use></svg><span id="hc"></span></span><span className="hero__caption-action"><svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></span></span></figcaption></figure><svg className="hero__ring" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="hr" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0"></path></defs><circle className="hero__ring-disc" cx="100" cy="100" r="96"></circle><g className="hero__ring-text"><text className="hero__ring-label" fontSize="15" fontWeight="900" letterSpacing="1.5"><textPath href="#hr" textLength="470" lengthAdjust="spacing">SUA VIAGEM COMEÇA AQUI • ROTA CULTURAL • </textPath></text></g><use className="hero__ring-plane" href="#i-plane" x="76" y="76" width="48" height="48"></use></svg></div></div></section>
{/* ==========================================================================
         FAIXA DECORATIVA / MARQUEE
      ========================================================================== */}
<div className="marquee" aria-hidden="true"><div className="marquee__track"><span>Praias</span><span>História</span><span>Cidades</span><span>Natureza</span><span>Aventura</span><span>Gastronomia</span><span>Praias</span><span>História</span><span>Cidades</span><span>Natureza</span><span>Aventura</span><span>Gastronomia</span></div></div>
    </>
  );
}
