/* ==========================================================================
   COMPONENTE: Hero
   Hero temático, fotos rotativas e seletor de estilo.
========================================================================== */

export default function Hero() {
  return (
    <>
      <section className="location-hero" id="topo" aria-label="Apresentação do local">
        <img className="location-hero__background is-visible" id="bgA" alt="" />
        <img className="location-hero__background" id="bgB" alt="" />
        <div className="location-hero__effects" id="fx" aria-hidden="true"></div>
        <svg className="location-icon location-hero__decoration-icon" id="bigIco" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-mountain"></use></svg>
        <div className="location-layout__container location-hero__content">
          <nav className="location-hero__breadcrumbs" aria-label="Você está em">
            <a href="index.html">Home</a>
            <svg className="location-icon" aria-hidden="true"><use href="#i-chev-r"></use></svg>
            <a href="index.html#explorar">Destinos</a>
            <svg className="location-icon" aria-hidden="true"><use href="#i-chev-r"></use></svg>
            <span id="crumbCat"></span>
          </nav>
          <p className="location-hero__eyebrow" id="kick"></p>
          <h1 className="location-hero__title" id="lName"></h1>
          <p className="location-hero__description" id="lTag"></p>
          <div className="location-hero__meta" id="lMeta"></div>
          <div className="location-hero__actions">
            <button className="location-button" id="btnFav" aria-pressed="false"><svg className="location-icon" aria-hidden="true"><use href="#i-heart"></use></svg><span>Favoritar</span></button>
            <button className="location-button location-button--outline" id="btnShare"><svg className="location-icon" aria-hidden="true"><use href="#i-share"></use></svg>Compartilhar</button>
            <a className="location-button location-button--outline" id="btnRoute" target="_blank" rel="noopener"><svg className="location-icon" aria-hidden="true"><use href="#i-nav"></use></svg>Como chegar</a>
          </div>
        </div>
        <div className="location-layout__container">
          <div className="location-glass-panel" role="group" aria-label="Escolha o estilo do local">
            <div className="location-section-heading"><svg className="location-icon" aria-hidden="true"><use href="#i-sparkles"></use></svg><b>Escolha o estilo do local</b><small>A página inteira muda de clima</small></div>
            <div className="location-style-selector" id="styRow"></div>
          </div>
        </div>
      </section>
    </>
  );
}
