/* ==========================================================================
   COMPONENTE: Routes
   Roteiros relacionados e paradas.
========================================================================== */

export default function Routes() {
  return (
    <>
      <section className="location-section location-section--white" id="roteiros">
        <div className="location-layout__container">
          <div className="location-sh location-split location-reveal">
            <div>
              <span className="location-badge"><svg className="location-icon" aria-hidden="true"><use href="#i-map"></use></svg>Roteiros</span>
              <h2 className="location-section__title">Roteiros de quem<em className="location-hl">já foi</em></h2>
              <p className="location-section__lead">Veja como outras pessoas aproveitaram este local, salve os que gostar e crie o seu.</p>
            </div>
            <div>
              <button className="location-button" id="btnNewRot" type="button"><svg className="location-icon" aria-hidden="true"><use href="#i-plus"></use></svg>Criar meu roteiro</button>
            </div>
          </div>
          <div className="location-rgrid" id="rGrid"></div>
        </div>
      </section>
    </>
  );
}
