/* ==========================================================================
   COMPONENTE: MarqueeIntro
   Faixa animada de introdução.
========================================================================== */

export default function MarqueeIntro() {
  return (
    <>
      <div className="community-marquee" aria-hidden="true">
        <div className="community-marquee__track">
          <span>Histórias</span>
          <span>Dicas</span>
          <span>Roteiros</span>
          <span>Comunidade</span>
          <span>Viagens</span>
          <span>Moradores</span>
          <span>Histórias</span>
          <span>Dicas</span>
          <span>Roteiros</span>
          <span>Comunidade</span>
          <span>Viagens</span>
          <span>Moradores</span>
        </div>
      </div>
    </>
  );
}
