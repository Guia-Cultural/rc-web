/* ==========================================================================
   COMPONENTE: Destinos
   Responsabilidade: estrutura visual da seção original da Home.
   Classes BEM e estilos inline específicos preservados.
   Interações da seção permanecem na feature Visit.
========================================================================== */
import "./Destinos.css";

export default function Destinos() {
  return (
    <>
      {/* ==========================================================================
         SEÇÃO 1: MARCAÇÃO DA SEÇÃO DESTINOS
      ========================================================================== */}
<section className="destinos section" id="explorar"><div className="layout-container"><div className="section-heading reveal"><div><span className="badge"><svg className="icon" aria-hidden="true"><use href="#i-compass"></use></svg>Destinos</span><h2 className="section-title">Explorar <span className="text-highlight">destinos</span></h2><p className="section-description">Explore os tipos de viagem que mais combinam com você e encontre o destino ideal para a sua próxima aventura.</p></div><p className="handwritten-note">Mais do que lugares,<br />são histórias.</p></div>
<div className="destinos__categories" id="cats"></div>
<div className="destinos__filters" id="locais"><div className="destinos__search"><svg className="icon" aria-hidden="true"><use href="#i-search"></use></svg><input className="form-field" id="pq" placeholder="Buscar local, cidade ou categoria" aria-label="Buscar local" /></div><select className="form-field" id="puf" aria-label="Filtrar por estado"></select><div className="destinos__price-options" id="pp" role="group" aria-label="Preço"><button data-v="all" aria-pressed="true">Todos</button><button data-v="free" aria-pressed="false">Gratuitos</button><button data-v="paid" aria-pressed="false">Pagos</button></div><button className="destinos__clear" id="pclr"><svg className="icon" aria-hidden="true"><use href="#i-x"></use></svg>Limpar</button></div>
<h3 className="section-subtitle destinos__featured-title">Locais em destaque</h3><p className="destinos__results-count" id="pcount"></p><div className="destinos__places-grid" id="pgrid"></div><div className="destinos__load-more" id="pmore"><button className="button button--dark">Ver mais locais</button></div></div></section>
    </>
  );
}
