/* ==========================================================================
   COMPONENTE: SobreNos
   Responsabilidade: estrutura visual da seção original da Home.
   Classes BEM com estilos centralizados no CSS do componente.
   Interações da seção permanecem na feature Visit.
========================================================================== */
import SobreNosInlineImage1 from "../../../assets/images/home/home-sobre-nos-gallery-01.jpg";
import SobreNosInlineImage2 from "../../../assets/images/home/home-sobre-nos-gallery-02.jpg";
import "./SobreNos.css";

export default function SobreNos() {
  return (
    <>
      {/* ==========================================================================
         SEÇÃO 1: MARCAÇÃO DA SEÇÃO SOBRENOS
      ========================================================================== */}
<section className="sobre-nos section" id="sobre">
<div className="layout-container"><div className="sobre-nos__intro">
<div className="section-heading sobre-nos__intro-heading reveal"><span className="badge"><svg className="icon" aria-hidden="true"><use href="#i-info"></use></svg>Sobre nós</span><h2 className="section-title">Cultura perto de você, em <em className="text-highlight">um só lugar</em></h2>
<p className="section-description">O Rota Cultural reúne eventos, museus, pontos turísticos e gastronomia local para você economizar tempo, planejar melhor e viver experiências culturais de verdade.</p>
<div className="sobre-nos__features">
<a className="sobre-nos__feature sobre-nos__feature--yellow" href="#explorar"><svg className="icon" aria-hidden="true"><use href="#i-sparkles"></use></svg><span>Eventos<small>agenda num só lugar</small></span></a>
<a className="sobre-nos__feature sobre-nos__feature--green" href="#explorar"><svg className="icon" aria-hidden="true"><use href="#i-landmark"></use></svg><span>Museus<small>do grande ao pequeno</small></span></a>
<a className="sobre-nos__feature sobre-nos__feature--orange" href="#explorar"><svg className="icon" aria-hidden="true"><use href="#i-pin"></use></svg><span>Pontos turísticos<small>por perfil e preço</small></span></a>
<a className="sobre-nos__feature sobre-nos__feature--blue" href="#explorar"><svg className="icon" aria-hidden="true"><use href="#i-heart"></use></svg><span>Gastronomia local<small>sabores de cada cidade</small></span></a></div>
<div className="sobre-nos__actions"><a className="button" href="#explorar">Explorar destinos <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a><a className="button button--ghost" href="roteiros.html">Criar meu roteiro</a></div></div>
<div className="sobre-nos__collage reveal reveal--delay-150">
<figure className="sobre-nos__collage-item--one"><img data-as="macaw" alt="Arara-azul em uma árvore diante de uma praia de água turquesa" /></figure>
<figure className="sobre-nos__collage-item--two"><img data-as="surf2" alt="Surfista em uma onda azul" /></figure>
<figure className="sobre-nos__collage-item--three"><img data-as="stairs" alt="Escadaria colorida com a bandeira do Brasil em uma rua do Rio" /></figure>
<span className="sobre-nos__chip sobre-nos__chip--knowledge">Conhecimento</span>
<span className="sobre-nos__chip sobre-nos__chip--culture">Cultura</span>
<span className="sobre-nos__chip sobre-nos__chip--adventure">Aventura</span></div>
</div></div>
{/* ==========================================================================
         FAIXA DECORATIVA / MARQUEE
      ========================================================================== */}
<div className="marquee" aria-hidden="true"><div className="marquee__track"><span>Eventos</span><span>Museus</span><span>Pontos turísticos</span><span>Gastronomia</span><span>Roteiros</span><span>Comunidade</span><span>Eventos</span><span>Museus</span><span>Pontos turísticos</span><span>Gastronomia</span><span>Roteiros</span><span>Comunidade</span></div></div>
<div className="layout-container">
{/* SEÇÃO 2: MISSÃO E PROPÓSITO */}
<div className="sobre-nos__mission">
<figure className="sobre-nos__mission-visual reveal"><i className="sobre-nos__mission-decoration"></i><div className="sobre-nos__mission-frame"><img data-as="dogcar" alt="Cachorro golden retriever de óculos de sol com a pata para fora do carro, em uma estrada à beira-mar" /><figcaption className="sobre-nos__mission-note">O mundo é<br />o nosso destino</figcaption><img className="sobre-nos__mission-paw" data-as="paw" alt="" /></div></figure>
<div className="reveal reveal--delay-120"><span className="badge"><svg className="icon" aria-hidden="true"><use href="#i-compass"></use></svg>Nossa missão</span><h3 className="sobre-nos__subtitle">Tornar a cultura mais <span className="sobre-nos__highlight sobre-nos__highlight--orange">acessível</span> e <span className="sobre-nos__highlight sobre-nos__highlight--orange">próxima</span> de todos.</h3>
<ul className="sobre-nos__checks"><li><svg className="icon" aria-hidden="true"><use href="#i-shield"></use></svg>Curadoria de lugares reais, do clássico ao inesperado</li><li><svg className="icon" aria-hidden="true"><use href="#i-shield"></use></svg>Filtros por categoria, localização e preço</li><li><svg className="icon" aria-hidden="true"><use href="#i-shield"></use></svg>Recomendações que combinam com o seu perfil</li></ul>
<a className="button" href="#plano">Planeje sua próxima aventura <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></div>
</div>
<h3 className="section-subtitle sobre-nos__section-title--accent reveal">Feito para quem viaja e para quem mora</h3>
{/* SEÇÃO 3: PÚBLICOS ATENDIDOS */}
<div className="sobre-nos__audiences reveal">
<article className="sobre-nos__audience-card sobre-nos__audience-card--orange"><div className="sobre-nos__audience-content"><span className="sobre-nos__audience-label"><svg className="icon" aria-hidden="true"><use href="#i-user"></use></svg>Para quem viaja</span><h3>Chegue sabendo o que viver</h3><p>Planeje com curadoria, descubra o que fazer em cada destino e aproveite melhor o seu tempo.</p><a className="sobre-nos__audience-action" href="#explorar">Explorar destinos <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></div><img className="sobre-nos__audience-image" src={SobreNosInlineImage1} alt="Escadaria branca com vista para o mar azul" /></article>
<article className="sobre-nos__audience-card sobre-nos__audience-card--blue"><div className="sobre-nos__audience-content"><span className="sobre-nos__audience-label"><svg className="icon" aria-hidden="true"><use href="#i-home"></use></svg>Para quem mora</span><h3>Mostre o que faz seu lugar especial</h3><p>Descubra programas perto de casa e compartilhe dicas que só quem vive aqui conhece.</p><button className="sobre-nos__audience-action" type="button" data-auth="register">Entrar na comunidade <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button></div><img className="sobre-nos__audience-image" src={SobreNosInlineImage2} alt="Casa moderna com carro e mala de viagem na entrada" /></article>
</div>
<h3 className="sobre-nos__problem-title reveal">Planejar um passeio cultural<br />não deveria dar <span className="sobre-nos__highlight">tanto trabalho</span></h3>
{/* SEÇÃO 4: PROBLEMAS QUE RESOLVEMOS */}
<div className="sobre-nos__problems">
<article className="sobre-nos__problem-card sobre-nos__problem-card--blue reveal"><div><span className="sobre-nos__number">01</span><h4>Informação espalhada</h4><p>Redes sociais, sites de turismo e páginas institucionais: cada pedaço do roteiro está em um lugar diferente.</p></div><div className="sobre-nos__problem-image"><img data-as="x-colonial" alt="Igreja histórica em rua de pedra" /></div></article>
<article className="sobre-nos__problem-card sobre-nos__problem-card--orange reveal reveal--delay-120"><div><span className="sobre-nos__number">02</span><h4>Cultura local pouco vista</h4><p>Espaços e eventos de menor porte têm pouca visibilidade, e quase todo mundo acaba nos mesmos lugares populares.</p></div><div className="sobre-nos__problem-image"><img data-as="x-street" alt="Rua colorida de casarões" /></div></article>
<article className="sobre-nos__problem-card sobre-nos__problem-card--featured sobre-nos__problem-card--yellow reveal reveal--delay-240"><div><span className="sobre-nos__number">03</span><h4>Nossa resposta: Rota Cultural</h4><p>Uma única plataforma para descobrir atrações e experiências alinhadas ao seu perfil, seja você turista ou morador.</p><a className="sobre-nos__problem-action" href="#como-funciona">Ver como funciona <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></div><div className="sobre-nos__problem-image"><img data-as="x-river" alt="Rio cercado de mata" /></div></article>
</div>
<h3 className="section-subtitle reveal">O Brasil em números</h3>
{/* SEÇÃO 5: DADOS E ESTATÍSTICAS */}
<div className="sobre-nos__banner reveal" id="stats"><img data-as="stairs" alt="Escadaria colorida com a bandeira do Brasil pintada" />
<div className="sobre-nos__stat"><b data-count="29.6" data-suf="%">29,6%</b><span>dos municípios brasileiros possuem museus</span><div className="sobre-nos__bar"><i className="sobre-nos__bar-fill sobre-nos__bar-fill--museums"></i></div></div>
<div className="sobre-nos__stat"><b data-count="31.4" data-suf="%">31,4%</b><span>da população vive em cidades sem museus</span><div className="sobre-nos__bar"><i className="sobre-nos__bar-fill sobre-nos__bar-fill--cities"></i></div></div>
<div className="sobre-nos__stat"><b data-count="42.5" data-suf="%">42,5%</b><span>vive em municípios sem cinemas</span><div className="sobre-nos__bar"><i className="sobre-nos__bar-fill sobre-nos__bar-fill--cinemas"></i></div></div>
<small>Fonte: IBGE.</small></div>
<h3 className="section-subtitle reveal" id="como-funciona">Como funciona</h3>
{/* SEÇÃO 6: COMO FUNCIONA */}
<ol className="sobre-nos__checklist reveal">
<li className="sobre-nos__checklist-item sobre-nos__checklist-item--orange"><span className="sobre-nos__check-icon"><svg className="icon" aria-hidden="true"><use href="#i-map"></use></svg><span className="sobre-nos__controls">1</span></span><h4>Explore</h4><p>Navegue por categorias como História, Natureza, Praias, Cidades e Aventura.</p><a className="sobre-nos__link" href="#explorar">Ver destinos <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></li>
<li className="sobre-nos__checklist-item sobre-nos__checklist-item--blue"><span className="sobre-nos__check-icon"><svg className="icon" aria-hidden="true"><use href="#i-search"></use></svg><span className="sobre-nos__controls">2</span></span><h4>Filtre</h4><p>Encontre opções por categoria, localização e preço, inclusive as gratuitas.</p><a className="sobre-nos__link" href="#locais">Filtrar locais <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></li>
<li className="sobre-nos__checklist-item sobre-nos__checklist-item--green"><span className="sobre-nos__check-icon"><svg className="icon" aria-hidden="true"><use href="#i-pin"></use></svg><span className="sobre-nos__controls">3</span></span><h4>Receba recomendações</h4><p>Conte seu perfil de interesse e receba um plano com a sua cara.</p><a className="sobre-nos__link" href="#plano">Criar meu plano <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></li>
<li className="sobre-nos__checklist-item sobre-nos__checklist-item--red"><span className="sobre-nos__check-icon"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"></path><circle cx="12" cy="13" r="3.500"></circle></svg><span className="sobre-nos__controls">4</span></span><h4>Compartilhe</h4><p>Entre na comunidade, publique suas histórias e inspire outros viajantes.</p><a className="sobre-nos__link" href="#blogs">Ver a comunidade <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></a></li>
</ol>
<h3 className="section-subtitle reveal">O que nos move</h3>
{/* SEÇÃO 7: VALORES */}
<div className="sobre-nos__values">
<article className="sobre-nos__value-card sobre-nos__value-card--orange reveal"><span className="sobre-nos__value-icon"><svg className="icon" aria-hidden="true"><use href="#i-compass"></use></svg></span><h4>Autenticidade</h4><p>Valorizamos o que é real, original e genuíno em cada destino.</p></article>
<article className="sobre-nos__value-card sobre-nos__value-card--blue reveal reveal--delay-100"><span className="sobre-nos__value-icon"><svg className="icon" aria-hidden="true"><use href="#i-users"></use></svg></span><h4>Respeito à cultura</h4><p>Promovemos o turismo consciente e o respeito às comunidades locais.</p></article>
<article className="sobre-nos__value-card sobre-nos__value-card--green reveal reveal--delay-200"><span className="sobre-nos__value-icon"><svg className="icon" aria-hidden="true"><use href="#i-shield"></use></svg></span><h4>Segurança</h4><p>Informação confiável para você viajar com tranquilidade.</p></article>
<article className="sobre-nos__value-card sobre-nos__value-card--red reveal reveal--delay-300"><span className="sobre-nos__value-icon"><svg className="icon" aria-hidden="true"><use href="#i-mountain"></use></svg></span><h4>Sustentabilidade</h4><p>Um turismo que preserva o presente e o futuro dos lugares.</p></article>
</div>
{/* SEÇÃO 8: CHAMADA FINAL */}
<div className="sobre-nos__cta reveal"><div className="sobre-nos__cta-content"><span className="badge">Vem com a gente</span><h3>Pronto para viver novas histórias?</h3><p>Explore, descubra e planeje. O Rota Cultural guia você em cada passo da jornada.</p>
<div className="sobre-nos__cta-actions"><button className="button" data-auth="register">Criar minha conta <svg className="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button><a className="button button--outline-light" href="roteiros.html">Criar meu roteiro</a></div></div>
<img data-as="dogs" alt="Cachorros de óculos de sol tirando uma selfie" /></div>
</div></section>
<div className="marquee marquee--blue marquee--reverse" aria-hidden="true"><div className="marquee__track"><span>Descubra</span><span>Explore</span><span>Planeje</span><span>Viva</span><span>Compartilhe</span><span>Volte</span><span>Descubra</span><span>Explore</span><span>Planeje</span><span>Viva</span><span>Compartilhe</span><span>Volte</span></div></div>
    </>
  );
}
