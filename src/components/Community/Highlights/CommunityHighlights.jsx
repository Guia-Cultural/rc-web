/* ==========================================================================
   COMPONENTE: Highlights
   Destaques e rankings de histórias.
========================================================================== */

export default function Highlights() {
  return (
    <>
      <section className="community-section--padded community-highlights" id="destaques">
        <div className="community-layout__container">
          <div className="community-section-heading community-reveal">
            <div>
              <span className="community-badge"><svg className="community-icon" aria-hidden="true"><use href="#i-star"></use></svg>Em alta</span>
              <h2>Destaques da<span className="community-highlight community-highlight--green">comunidade</span></h2>
              <p className="community-section__lead community-section__lead--flush" id="hcap"></p>
            </div>
            <div className="community-seg" id="seg" role="group" aria-label="Critério dos destaques">
              <button data-k="like" aria-pressed="true"><svg className="community-icon" aria-hidden="true"><use href="#i-heart"></use></svg><span>Mais curtidas</span></button>
              <button data-k="cm" aria-pressed="false"><svg className="community-icon" aria-hidden="true"><use href="#i-comment"></use></svg><span>Mais comentadas</span></button>
              <button data-k="sv" aria-pressed="false"><svg className="community-icon" aria-hidden="true"><use href="#i-bookmark"></use></svg><span>Mais salvas</span></button>
            </div>
          </div>
          <div className="community-highlights__grid" id="hlg" aria-live="polite"></div>
        </div>
      </section>
    </>
  );
}
