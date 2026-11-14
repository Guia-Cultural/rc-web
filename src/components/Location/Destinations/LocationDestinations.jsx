/* ==========================================================================
   COMPONENTE: Destinations
   Outros destinos recomendados.
========================================================================== */

export default function Destinations() {
  return (
    <>
      <section className="location-section location-section--soft" id="destinos">
        <div className="location-layout__container">
          <div className="location-sh location-reveal">
            <span className="location-badge"><svg className="location-icon" aria-hidden="true"><use href="#i-compass"></use></svg>Destinos</span>
            <h2 className="location-section__title">Explore<em className="location-hl">outros locais</em></h2>
            <p className="location-section__lead">Toque em um local para ver os detalhes em uma janela rápida. O clima da página muda quando você abre outro local.</p>
          </div>
          <div className="location-tool location-reveal" id="dTool" role="search">
            <label className="location-fi"><svg className="location-icon" aria-hidden="true"><use href="#i-search"></use></svg><span className="location-visually-hidden">Buscar local, cidade ou categoria</span><input id="dQ" type="search" placeholder="Buscar local, cidade ou categoria" autoComplete="off" /></label>
            <label className="location-fs">
              <span className="location-visually-hidden">Filtrar por estado</span>
              <select id="dUF"></select>
              <svg className="location-icon" aria-hidden="true"><use href="#i-chev-d"></use></svg>
            </label>
            <div className="location-seg" id="dSeg" role="group" aria-label="Preço">
              <button type="button" data-dp="" aria-pressed="true">Todos</button>
              <button className="location-g" type="button" data-dp="g" aria-pressed="false">Gratuitos</button>
              <button className="location-o" type="button" data-dp="p" aria-pressed="false">Pagos</button>
            </div>
            <button className="location-clr" type="button" id="dClr"><svg className="location-icon" aria-hidden="true"><use href="#i-x"></use></svg>Limpar</button>
          </div>
          <div className="location-dfil" id="dFil"></div>
          <p className="location-hint" id="dCount" aria-live="polite"></p>
          <div className="location-dgrid" id="dGrid"></div>
          <div className="location-destinations__more-wrap">
            <button className="location-button location-button--ghost" id="dMore" type="button" hidden="">Ver mais locais</button>
          </div>
        </div>
      </section>
    </>
  );
}
