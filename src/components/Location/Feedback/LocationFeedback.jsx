/* ==========================================================================
   COMPONENTE: Feedback
   Feedbacks e relatos de moradores.
========================================================================== */

export default function Feedback() {
  return (
    <>
      <section className="location-section location-section--soft" id="feedbacks">
        <div className="location-layout__container">
          <div className="location-sh location-split location-reveal">
            <div>
              <span className="location-badge"><svg className="location-icon" aria-hidden="true"><use href="#i-home"></use></svg>Moradores</span>
              <h2 className="location-section__title">Dicas de<em className="location-hl">quem mora aqui</em></h2>
              <p className="location-section__lead">Feedbacks de moradores nativos: o que não está nos guias.</p>
            </div>
            <div className="location-hero__actions">
              <button className="location-button location-act-hide" id="btnFb" hidden=""><svg className="location-icon" aria-hidden="true"><use href="#i-plus"></use></svg>Escrever uma dica</button>
              <button className="location-button location-act-hide location-button--ghost" id="btnCreate" type="button" hidden=""><svg className="location-icon" aria-hidden="true"><use href="#i-pin"></use></svg>Cadastrar um local</button>
            </div>
          </div>
          <div className="location-feedback" id="fbs"></div>
        </div>
      </section>
    </>
  );
}
