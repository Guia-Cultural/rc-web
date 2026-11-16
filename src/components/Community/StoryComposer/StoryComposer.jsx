/* ==========================================================================
   COMPONENTE: StoryComposer
   Formulário de publicação de experiências em etapas.
========================================================================== */

export default function StoryComposer() {
  return (
    <>
      <section className="community-section--padded" id="escrever">
        <div className="community-layout__container">
          <div className="community-reveal">
            <span className="community-badge"><svg className="community-icon" aria-hidden="true"><use href="#i-pen"></use></svg>Sua vez</span>
            <h2>Conte a sua<span className="community-highlight community-highlight--orange">experiência</span></h2>
            <p className="community-section__lead">Três passinhos rápidos: escolha o tema, conte a história e, se quiser, deixe o roteiro.</p>
          </div>
          <div className="community-composer__card community-reveal">
            <aside className="community-composer__sidebar">
              <span className="community-avatar" id="meav"></span>
              <div className="community-composer__profile"><small>Viajante da comunidade</small><b id="mename"></b></div>
              <p className="community-composer__quote">Bora contar a sua?</p>
              <div className="community-composer__stats">
                <div><b data-s="posts">0</b><small>Histórias</small></div>
                <div><b data-s="likes">0</b><small>Curtidas</small></div>
                <div><b data-s="saved">0</b><small>Salvos</small></div>
              </div>
            </aside>
            <form className="community-composer__form" id="form" noValidate="">
              <div className="community-composer__steps" id="passos">
                <button className="community-composer__step is-on" type="button" data-passo="1"><b>1</b>Sobre o quê</button>
                <button className="community-composer__step" type="button" data-passo="2"><b>2</b>Sua história</button>
                <button className="community-composer__step" type="button" data-passo="3"><b>3</b>Roteiro</button>
              </div>
              <div className="community-composer__panel is-on" data-etapa="1">
                <h3>Sobre o quê vai ser?</h3>
                <p className="community-composer__subtitle">Toque em uma categoria.</p>
                <div className="community-composer__category-grid" id="ccats"></div>
                <div className="community-form__error" data-e="cat"></div>
                <div className="community-form__field community-form__field--spaced"><label htmlFor="loc">Onde foi?<small className="community-form__optional">(opcional)</small></label><input className="community-form__input" id="loc" maxLength="40" placeholder="Ex: Ouro Preto, MG" /></div>
              </div>
              <div className="community-composer__panel" data-etapa="2">
                <h3>Agora conte tudo!</h3>
                <p className="community-composer__subtitle">Um título curto e poucas linhas já bastam.</p>
                <div className="community-form__field">
                  <label htmlFor="tit">Título</label>
                  <input className="community-form__input" id="tit" maxLength="80" placeholder="Ex: Um final de semana no centro histórico" />
                  <div className="community-form__error" data-e="tit"></div>
                </div>
                <div className="community-form__field">
                  <label htmlFor="txt">Sua história</label>
                  <div className="community-composer__suggestions" id="sugest">
                    <button type="button" data-ini="O que vi: ">👀 O que vi</button>
                    <button type="button" data-ini="O que comi: ">🍽️ O que comi</button>
                    <button type="button" data-ini="Quanto gastei: R$ ">💸 Quanto gastei</button>
                    <button type="button" data-ini="Minha dica: ">💡 Minha dica</button>
                  </div>
                  <textarea className="community-form__input" id="txt" maxLength="600" placeholder="Toque em uma sugestão acima ou escreva do seu jeito…"></textarea>
                  <div className="community-composer__progress"><i id="cbi"></i></div>
                  <div className="community-form__error" data-e="txt"></div>
                </div>
                <div className="community-form__field">
                  <span className="community-lb">Foto<small className="community-form__optional">(opcional)</small></span>
                  <label className="community-composer__dropzone"><svg className="community-icon" aria-hidden="true"><use href="#i-image"></use></svg><span id="dt">Adicionar foto</span><input id="foto" type="file" accept="image/*" /></label>
                  <div className="community-composer__preview" id="pv">
                    <img id="pvi" alt="Prévia da foto" />
                    <button className="community-pilula" type="button" id="rmf">Remover</button>
                  </div>
                </div>
              </div>
              <div className="community-composer__panel" data-etapa="3">
                <h3>Quer deixar o roteiro?</h3>
                <p className="community-composer__subtitle">Anexe um roteiro que você já criou. É opcional.</p>
                <label className="community-composer__switch"><input type="checkbox" id="rotOn" /><i></i>Adicionar roteiro à história</label>
                <div id="rotSel" hidden=""></div>
              </div>
              <div className="community-composer__footer">
                <small id="cc">0/600</small>
                <small className="community-rascunho" id="ds"></small>
                <div className="community-composer__actions">
                  <button className="community-button community-button--small community-button--ghost" type="button" id="voltar" hidden="">Voltar</button>
                  <button className="community-button community-button--blue" type="button" id="prox">Continuar<svg className="community-icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button>
                  <button className="community-button community-button--blue" type="submit" id="pub" hidden="">Publicar história<svg className="community-icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
