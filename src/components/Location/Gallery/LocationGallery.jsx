/* ==========================================================================
   COMPONENTE: Gallery
   Galeria de fotos e abertura ampliada.
========================================================================== */

export default function Gallery() {
  return (
    <>
      <section className="location-section" id="fotos">
        <div className="location-layout__container">
          <div className="location-sh location-reveal">
            <span className="location-badge"><svg className="location-icon" aria-hidden="true"><use href="#i-image"></use></svg>Fotos</span>
            <h2 className="location-section__title">Veja como<em className="location-hl">é por lá</em></h2>
            <p className="location-section__lead">Clique em uma foto para ampliar.</p>
          </div>
          <div className="location-gallery location-reveal" id="mosaic"></div>
        </div>
      </section>
    </>
  );
}
