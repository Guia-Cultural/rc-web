/* ==========================================================================
   COMPONENTE: Recomendacao
   Responsabilidade: estrutura visual da seção original da Home.
   Classes BEM e estilos inline específicos preservados.
   Interações da seção permanecem na feature Visit.
========================================================================== */
import "./Recomendacao.css";

export default function Recomendacao() {
  return (
    <>
      {/* ==========================================================================
         SEÇÃO 1: MARCAÇÃO DA SEÇÃO RECOMENDACAO
      ========================================================================== */}
<section className="recomendacao recomendacao--v2 section" id="plano">
<div className="layout-container recomendacao__grid">
<div className="reveal"><span className="badge"><svg className="icon" aria-hidden="true"><use href="#i-sparkles"></use></svg>Para você</span>
<h2 className="recomendacao__title">Receba recomendações <span className="recomendacao__highlight">com a sua cara</span></h2>
<p className="section-description">Conte um pouco sobre você e montamos na hora um plano com lugares que combinam com o seu estilo.</p>
<ol className="recomendacao__steps">
<li className="recomendacao__step recomendacao__step--yellow"><span className="recomendacao__step-number">1</span><span>Conte seu estilo<small>Interesses, destino e faixa de preço.</small></span></li>
<li className="recomendacao__step recomendacao__step--sky"><span className="recomendacao__step-number">2</span><span>Geramos o plano<small>Os locais com mais a ver com você.</small></span></li>
<li className="recomendacao__step recomendacao__step--magenta"><span className="recomendacao__step-number">3</span><span>Escolha e viaje<small>Explore, compare e monte seu roteiro.</small></span></li>
</ol>
<p className="handwritten-note">Mais do que lugares,<br />são histórias.</p>
</div>
<div className="recomendacao__card recomendacao__card--v2 recomendacao__card--delayed reveal" id="pcard">
<form className="recomendacao__form" id="pf" noValidate>
<fieldset className="recomendacao__fieldset"><legend><span>1</span>Sobre você</legend>
<div className="recomendacao__form-grid"><div><label htmlFor="pn">Nome</label><input className="form-field" id="pn" autoComplete="name" placeholder="Como podemos te chamar?" /></div>
<div><label htmlFor="pe">E-mail</label><input className="form-field" id="pe" type="email" autoComplete="email" placeholder="voce@email.com" /></div></div></fieldset>
<fieldset className="recomendacao__fieldset"><legend><span>2</span>O que você curte</legend>
<div className="recomendacao__interests" id="pch"></div>
<label htmlFor="ploc">Tem um destino em mente? <small className="recomendacao__optional">(opcional)</small></label>
<input className="form-field" id="ploc" placeholder="Ex.: Salvador, Bonito, Florianópolis" autoComplete="off" /></fieldset>
<fieldset className="recomendacao__fieldset"><legend><span>3</span>Sua viagem</legend>
<div className="recomendacao__form-grid"><div><label htmlFor="pbud">Faixa de preço</label><select className="form-field recomendacao__field--full" id="pbud"><option value="any">Qualquer valor</option><option value="free">Só locais gratuitos</option><option value="eco">Econômica</option><option value="mid">Moderada</option><option value="prem">Confortável</option></select></div>
<div><label htmlFor="pco">Quem vai com você?</label><select className="form-field recomendacao__field--full" id="pco"><option>Viajo sozinho(a)</option><option>Em casal</option><option>Com amigos</option><option>Com a família</option></select></div></div></fieldset>
<p className="recomendacao__error" id="perr" role="alert"></p>
<button className="button button--blue button--wide" type="submit">Gerar recomendação <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button>
</form>
<div className="recomendacao__result" id="pres"></div>
</div>
</div>
</section>
    </>
  );
}
