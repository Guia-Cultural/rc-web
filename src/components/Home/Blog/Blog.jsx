/* ==========================================================================
   COMPONENTE: Blog
   Responsabilidade: estrutura visual da seção original da Home.
   Classes BEM e estilos inline específicos preservados.
   Interações da seção permanecem na feature Visit.
========================================================================== */
import "./Blog.css";

export default function Blog() {
  return (
    <>
      {/* ==========================================================================
         SEÇÃO 1: MARCAÇÃO DA SEÇÃO BLOG
      ========================================================================== */}
<section className="blog section" id="blogs"><div className="layout-container"><div className="blog__grid">
<div className="section-heading blog__intro-heading reveal"><span className="badge"><svg className="icon" aria-hidden="true"><use href="#i-users"></use></svg>Comunidade</span><h2 className="section-title">Viaje <span className="blog__title-highlight">pelas histórias</span> de quem já foi</h2>
<p className="section-description">Dicas reais de viajantes e moradores, roteiros que deram certo e descobertas que você não acha em guia nenhum.</p>
<ul className="blog__benefits"><li className="blog__benefit blog__benefit--yellow"><svg className="icon" aria-hidden="true"><use href="#i-pen"></use></svg>Publique suas histórias e fotos</li><li className="blog__benefit blog__benefit--pink"><svg className="icon" aria-hidden="true"><use href="#i-heart"></use></svg>Curta e comente as dicas de outros viajantes</li><li className="blog__benefit blog__benefit--green"><svg className="icon" aria-hidden="true"><use href="#i-pin"></use></svg>Descubra o que os moradores indicam</li><li className="blog__benefit blog__benefit--blue"><svg className="icon" aria-hidden="true"><use href="#i-sparkles"></use></svg>Salve favoritos e monte seus roteiros</li></ul>
<div className="blog__actions" id="btCtas"><button className="button" data-auth="register">Criar conta grátis <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button><button className="button button--ghost" data-auth="login">Já tenho conta</button></div>
<p className="blog__live"><span className="blog__live-icon"><svg className="icon" aria-hidden="true"><use href="#i-sparkles"></use></svg></span><span id="btLive"></span></p></div>
<div className="blog__feed blog__feed--delayed reveal"><div className="blog__filters" id="btChips" role="group" aria-label="Categorias"></div><div className="blog__posts" id="btStack" aria-live="polite"></div>
<div className="blog__access-gate"><div className="blog__gate-card"><svg className="icon" aria-hidden="true"><use href="#i-shield"></use></svg><b>Tem muito mais esperando por você</b><span>Entre para ler, curtir e comentar.</span><button className="button" data-auth="register">Entrar na comunidade</button></div></div></div>
</div></div></section>
{/* ==========================================================================
         FAIXA DECORATIVA / MARQUEE
      ========================================================================== */}
<div className="marquee marquee--orange marquee--reverse" aria-hidden="true"><div className="marquee__track"><span>Praias</span><span>História</span><span>Cidades</span><span>Natureza</span><span>Aventura</span><span>Gastronomia</span><span>Praias</span><span>História</span><span>Cidades</span><span>Natureza</span><span>Aventura</span><span>Gastronomia</span></div></div>
    </>
  );
}
