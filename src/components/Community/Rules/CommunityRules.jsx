/* ==========================================================================
   COMPONENTE: Rules
   Regras e orientações da comunidade.
========================================================================== */

export default function Rules() {
  return (
    <>
      <section className="community-section--padded community-rules" id="regras">
        <div className="community-layout__container">
          <div className="community-reveal">
            <span className="community-badge"><svg className="community-icon" aria-hidden="true"><use href="#i-shield"></use></svg>Antes de começar</span>
            <h2>Regras da<span className="community-highlight community-highlight--green">comunidade</span></h2>
            <p className="community-section__lead">Quatro combinados rápidos para a nossa rota ser boa para todo mundo.</p>
          </div>
          <div className="community-rules__grid">
            <article className="community-rule-card community-rule-card--yellow community-rule-card--delay-0">
              <span className="community-rule-card__number">1</span>
              <div className="community-rule-card__icon"><svg className="community-icon" aria-hidden="true"><use href="#i-heart"></use></svg></div>
              <h3>Seja gentil</h3>
              <p>Respeite todas as pessoas. Aqui cabe todo tipo de viajante e de morador.</p>
            </article>
            <article className="community-rule-card community-rule-card--green community-rule-card--delay-120">
              <span className="community-rule-card__number">2</span>
              <div className="community-rule-card__icon"><svg className="community-icon" aria-hidden="true"><use href="#i-comment"></use></svg></div>
              <h3>Fale do que viveu</h3>
              <p>Conte experiências reais e dê dicas úteis para quem vai viajar depois de você.</p>
            </article>
            <article className="community-rule-card community-rule-card--orange community-rule-card--light-text community-rule-card--delay-240">
              <span className="community-rule-card__number">3</span>
              <div className="community-rule-card__icon"><svg className="community-icon" aria-hidden="true"><use href="#i-shield"></use></svg></div>
              <h3>Proteja seus dados</h3>
              <p>Não divulgue telefone, endereço, documentos ou dados pessoais de ninguém.</p>
            </article>
            <article className="community-rule-card community-rule-card--pink community-rule-card--light-text community-rule-card--delay-360">
              <span className="community-rule-card__number">4</span>
              <div className="community-rule-card__icon"><svg className="community-icon" aria-hidden="true"><use href="#i-x"></use></svg></div>
              <h3>Sem ofensas</h3>
              <p>Conteúdo ofensivo pode ser removido pela equipe do Rota Cultural.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
