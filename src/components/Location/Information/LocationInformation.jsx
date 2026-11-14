/* ==========================================================================
   COMPONENTE: Information
   Informações principais e ficha do local.
========================================================================== */

export default function Information() {
  return (
    <>
      <section className="location-section location-section--white" id="informacoes">
        <div className="location-layout__container">
          <div className="location-sh location-reveal">
            <span className="location-badge"><svg className="location-icon" aria-hidden="true"><use href="#i-info"></use></svg>Informações</span>
            <h2 className="location-section__title">Sobre<em className="location-hl" id="infoName"></em></h2>
          </div>
          <div className="location-info-grid">
            <div className="location-reveal">
              <p className="location-description" id="lDesc"></p>
              <div className="location-icards" id="lDests"></div>
            </div>
            <aside className="location-card location-facts location-reveal location-reveal--delay-120 location-card--themed">
              <h3>Ficha rápida</h3>
              <dl id="lFicha"></dl>
              <p className="location-demo-panel__note">Dados de exemplo. Confirme valores e horários no site oficial.</p>
            </aside>
          </div>
          <div className="location-stats4" id="lStats"></div>
          <div className="location-l2b">
            <div className="location-card location-an" id="lMeters"></div>
            <div className="location-card location-an" id="lMore"></div>
          </div>
          <div className="location-tip location-reveal" id="lTip"></div>
        </div>
        <div className="location-rib" aria-hidden="true">
          <div className="location-trk" id="ribTrk"></div>
        </div>
      </section>
    </>
  );
}
