/* ==========================================================================
   COMPONENTE: Feed
   Feed com filtros e histórias da comunidade.
========================================================================== */

export default function Feed() {
  return (
    <>
      <section className="community-section--padded" id="feed">
        <div className="community-layout__container">
          <div className="community-reveal">
            <span className="community-badge"><svg className="community-icon" aria-hidden="true"><use href="#i-compass"></use></svg>Histórias</span>
            <h2>Cada parada é uma<span className="community-highlight community-highlight--pink">história</span></h2>
          </div>
          <div className="community-tool community-reveal">
            <div className="community-visually-hidden"><svg className="community-icon" aria-hidden="true"><use href="#i-search"></use></svg><input className="community-form__input" id="q" type="search" placeholder="Buscar por título, cidade ou autor" aria-label="Buscar histórias" /></div>
            <select className="community-form__input" id="sort" aria-label="Ordenar">
              <option value="new">Mais recentes</option>
              <option value="like">Mais curtidas</option>
              <option value="cm">Mais comentadas</option>
              <option value="sv">Mais salvas</option>
            </select>
            <button className="community-tg" id="tsv" aria-pressed="false"><svg className="community-icon" aria-hidden="true"><use href="#i-bookmark"></use></svg>Salvos</button>
            <button className="community-tg" id="tme" aria-pressed="false"><svg className="community-icon" aria-hidden="true"><use href="#i-user"></use></svg>Meus</button>
          </div>
          <div className="community-chips" id="chips" role="group" aria-label="Categorias"></div>
          <p className="community-cnt" id="cnt"></p>
          <div className="community-grid" id="grid"></div>
          <div className="community-more">
            <button className="community-button community-button--blue" id="more">Carregar mais histórias<svg className="community-icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button>
          </div>
        </div>
      </section>
    </>
  );
}
