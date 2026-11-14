/* ==========================================================================
   COMPONENTE: Roteiros
   Responsabilidade: estrutura visual da seção original da Home.
   Classes BEM e estilos inline específicos preservados.
   Interações da seção permanecem na feature Visit.
========================================================================== */
import "./Roteiros.css";

export default function Roteiros() {
  return (
    <>
      {/* ==========================================================================
         SEÇÃO 1: MARCAÇÃO DA SEÇÃO ROTEIROS
      ========================================================================== */}
<section className="roteiros section" id="roteiros">
<div className="layout-container">
<div className="section-heading reveal">
<div><span className="badge"><svg className="icon" aria-hidden="true"><use href="#i-map"></use></svg>Roteiros</span>
<h2 className="section-title">Viaje como quem <span className="text-highlight">mora lá</span></h2>
<p className="section-description">Tudo o que você precisa no mesmo lugar: onde ficar, onde comer, onde ir, como se deslocar e o que só quem mora lá sabe.</p></div>
<p className="handwritten-note">Tudo que você precisa<br />no mesmo lugar.</p>
</div>
<div className="roteiros__trail" id="trail"></div>
<div className="roteiros__actions roteiros__actions--center reveal"><a className="button button--blue" href="roteiros.html">Criar meu roteiro <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></div>
</div>
</section>
{/* ==========================================================================
         FAIXA DECORATIVA / MARQUEE
      ========================================================================== */}
<div className="marquee marquee--orange" aria-hidden="true"><div className="marquee__track" id="rtRib"></div></div>
    </>
  );
}
