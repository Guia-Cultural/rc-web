/* ==========================================================================
   COMPONENTE: Hero
   Apresentação principal da comunidade.
========================================================================== */

export default function Hero() {
  return (
    <>
      <section className="community-hero" id="inicio">
        <i className="community-hero__decoration"></i>
        <div className="community-layout__container community-hero__grid">
          <div>
            <span className="community-badge"><svg className="community-icon" aria-hidden="true"><use href="#i-users"></use></svg>Comunidade</span>
            <h1>Blogs da<span className="community-highlight community-highlight--blue">comunidade</span></h1>
            <p className="community-section__lead">Compartilhe dicas, roteiros e descobertas. Curta, comente e converse com outros viajantes e moradores.</p>
            <div className="community-hero__actions">
              <a className="community-button community-button--blue" href="#escrever">Contar minha experiência<svg className="community-icon" aria-hidden="true"><use href="#i-pen"></use></svg></a>
              <a className="community-button community-button--ghost" href="#destaques">Ver destaques</a>
            </div>
            <div className="community-hero__stats">
              <div className="community-stat community-stat--yellow"><b data-g="posts">0</b><small>Histórias</small></div>
              <div className="community-stat community-stat--orange"><b data-g="likes">0</b><small>Curtidas</small></div>
              <div className="community-stat community-stat--blue"><b data-g="cm">0</b><small>Comentários</small></div>
            </div>
          </div>
          <div className="community-hero__collage community-reveal">
            <figure className="community-hero__photo community-hero__photo--one"><img data-i="boat" alt="Barco em um rio de água cristalina" /></figure>
            <figure className="community-hero__photo community-hero__photo--two"><img data-i="x-colonial" alt="Rua de casario colonial colorido" /></figure>
            <figure className="community-hero__photo community-hero__photo--three"><img data-i="card-praias" alt="Praia com coqueiros ao pôr do sol" /></figure>
            <div className="community-hero__bubble community-hero__bubble--one community-hero__bubble--yellow"><span className="community-avatar">C</span>Salvei pra fazer no sábado!</div>
            <div className="community-hero__bubble community-hero__bubble--two community-hero__bubble--blue"><span className="community-hero__curtidas"><svg className="community-icon" aria-hidden="true"><use href="#i-heart"></use></svg>41</span>curtidas</div>
          </div>
        </div>
      </section>
    </>
  );
}
