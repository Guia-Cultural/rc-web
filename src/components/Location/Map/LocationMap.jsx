/* ==========================================================================
   COMPONENTE: Map
   Endereço, mapa e localização.
========================================================================== */

export default function Map() {
  return (
    <>
      <section className="location-section" id="localizacao">
        <div className="location-layout__container">
          <div className="location-sh location-reveal">
            <span className="location-badge"><svg className="location-icon" aria-hidden="true"><use href="#i-pin"></use></svg>Localização</span>
            <h2 className="location-section__title">Como<em className="location-hl">chegar</em></h2>
          </div>
          <div className="location-map__canvas">
            <div className="location-card location-addr location-reveal">
              <p><svg className="location-icon" aria-hidden="true"><use href="#i-pin"></use></svg><span id="lAddr"></span></p>
              <p><svg className="location-icon" aria-hidden="true"><use href="#i-map"></use></svg><span id="lCity"></span></p>
              <div className="location-addr" id="lContato"></div>
              <a className="location-button" id="btnMap" target="_blank" rel="noopener"><svg className="location-icon" aria-hidden="true"><use href="#i-nav"></use></svg>Abrir no mapa</a>
            </div>
            <div className="location-map__card location-reveal location-reveal--delay-120"><svg className="location-map" viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect className="location-map__background" width="600" height="360"></rect>
                <path className="location-map__terrain" d="M0 250C120 210 200 300 330 260S520 190 600 230V360H0Z" opacity=".4"></path>
                <g className="location-map__roads" strokeWidth="14" strokeLinecap="round" fill="none"><path d="M-10 120H610"></path><path d="M180 -10V370"></path><path d="M420 -10 360 370"></path><path d="M-10 60 200 130"></path></g>
                <g className="location-map__blocks" opacity=".85">
                  <rect x="40" y="30" width="110" height="70" rx="12"></rect>
                  <rect x="210" y="20" width="150" height="80" rx="12"></rect>
                  <rect x="440" y="30" width="120" height="60" rx="12"></rect>
                  <rect x="40" y="145" width="110" height="60" rx="12"></rect>
                  <rect x="215" y="150" width="120" height="70" rx="12"></rect>
                  <rect x="430" y="150" width="130" height="70" rx="12"></rect>
                </g>
                <circle className="location-map__marker-pulse" cx="312" cy="166" r="46" opacity=".28">
                  <animate attributename="r" values="30;60;30" dur="3s" repeatcount="indefinite"></animate>
                </circle>
              </svg><span className="location-pinm"><svg className="location-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-pin"></use></svg></span><small>Mapa ilustrativo</small></div>
          </div>
        </div>
      </section>
    </>
  );
}
