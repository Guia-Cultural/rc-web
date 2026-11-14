/* ==========================================================================
   COMPONENTE: Hours
   Horários, status e dados de funcionamento.
========================================================================== */

export default function Hours() {
  return (
    <>
      <section className="location-section location-section--white" id="horarios">
        <div className="location-layout__container">
          <div className="location-sh location-reveal">
            <span className="location-badge"><svg className="location-icon" aria-hidden="true"><use href="#i-clock"></use></svg>Horários</span>
            <h2 className="location-section__title">Quando<em className="location-hl">visitar</em></h2>
          </div>
          <div className="location-info-grid">
            <div className="location-card location-reveal location-card--themed">
              <div className="location-live" id="lLive"></div>
              <div className="location-tl" id="lTl"></div>
              <p id="lStatus" className="location-hours__status"></p>
              <table className="location-hrs">
                <tbody id="lHrs"></tbody>
              </table>
            </div>
            <aside className="location-card location-reveal location-reveal--delay-120">
              <h3 className="location-hours__price-title">Ingresso</h3>
              <p className="location-price-big" id="lPrice"></p>
              <p id="lPriceTxt" className="location-hours__price-description"></p>
              <p className="location-demo-panel__note">Horários e valores de exemplo para demonstração.</p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
