/* ==========================================================================
   COMPONENTE: Reviews
   Avaliações e notas do local.
========================================================================== */

export default function Reviews() {
  return (
    <>
      <section className="location-section location-section--white" id="avaliacoes">
        <div className="location-layout__container">
          <div className="location-sh location-reveal">
            <span className="location-badge"><svg className="location-icon" aria-hidden="true"><use href="#i-star"></use></svg>Avaliações</span>
            <h2 className="location-section__title">O que dizem<em className="location-hl">os visitantes</em></h2>
          </div>
          <div className="location-info-grid">
            <div className="location-reveal">
              <div className="location-card location-sum location-card--themed">
                <div className="location-avg" id="avg"></div>
                <div className="location-bars" id="bars"></div>
              </div>
              <div className="location-reviews__bar"><b id="revCount"></b><label>
                  Ordenar 
                  <select id="revSort">
                    <option value="recentes">Mais recentes</option>
                    <option value="melhor">Melhor nota</option>
                    <option value="pior">Pior nota</option>
                  </select>
                </label></div>
              <ul className="location-reviews" id="revs"></ul>
              <div className="location-reviews__more-wrap">
                <button className="location-button location-button--ghost" id="revMore" type="button" hidden="">Ver mais avaliações</button>
              </div>
            </div>
            <aside className="location-card location-reveal location-reveal--delay-120">
              <h3 className="location-h-ic location-reviews__form-heading"><svg className="location-icon" aria-hidden="true"><use href="#i-pen"></use></svg>Avaliar este local</h3>
              <div className="location-lock location-act-hide" id="lockRev"><svg className="location-icon" aria-hidden="true"><use href="#i-lock"></use></svg><span>
                  Entre na sua conta para avaliar. 
                  <button className="location-linkbtn" type="button" data-auth="entrar">Entrar</button>
                </span></div>
              <form className="location-lform location-act-hide" id="revForm" noValidate="" hidden="">
                <div className="location-fld"><b className="location-lbl">Sua nota</b><span className="location-rate" role="radiogroup" aria-label="Sua nota">
                    <input type="radio" name="nota" id="n5" value="5" />
                    <label htmlFor="n5" title="5 estrelas"><svg className="location-icon" aria-hidden="true"><use href="#i-star"></use></svg><span className="location-visually-hidden">5 estrelas</span></label>
                    <input type="radio" name="nota" id="n4" value="4" />
                    <label htmlFor="n4" title="4 estrelas"><svg className="location-icon" aria-hidden="true"><use href="#i-star"></use></svg><span className="location-visually-hidden">4 estrelas</span></label>
                    <input type="radio" name="nota" id="n3" value="3" />
                    <label htmlFor="n3" title="3 estrelas"><svg className="location-icon" aria-hidden="true"><use href="#i-star"></use></svg><span className="location-visually-hidden">3 estrelas</span></label>
                    <input type="radio" name="nota" id="n2" value="2" />
                    <label htmlFor="n2" title="2 estrelas"><svg className="location-icon" aria-hidden="true"><use href="#i-star"></use></svg><span className="location-visually-hidden">2 estrelas</span></label>
                    <input type="radio" name="nota" id="n1" value="1" />
                    <label htmlFor="n1" title="1 estrela"><svg className="location-icon" aria-hidden="true"><use href="#i-star"></use></svg><span className="location-visually-hidden">1 estrela</span></label>
                  </span><span className="location-err" data-for="nota"></span></div>
                <p className="location-reviews__hint" id="revAs"></p>
                <label>
                  Comentário
                  <textarea name="texto" maxLength="400" placeholder="Conte como foi a sua visita"></textarea>
                  <span className="location-err" data-for="texto"></span>
                </label>
                <button className="location-button" type="submit">Publicar avaliação</button>
              </form>
              <hr className="location-reviews__separator" />
              <button className="location-button location-act-hide location-button--ghost" id="btnReport" hidden=""><svg className="location-icon" aria-hidden="true"><use href="#i-flag"></use></svg>Reportar um problema</button>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
