/* ==========================================================================
   COMPONENTE: SectionNav
   Navegação interna das seções do local.
========================================================================== */

export default function SectionNav() {
  return (
    <>
      <nav className="location-section-nav" aria-label="Seções do local">
        <div className="location-layout__container">
          <ul>
            <li>
              <a href="#informacoes"><svg className="location-icon" aria-hidden="true"><use href="#i-info"></use></svg>Informações</a>
            </li>
            <li>
              <a href="#fotos"><svg className="location-icon" aria-hidden="true"><use href="#i-image"></use></svg>Fotos</a>
            </li>
            <li>
              <a href="#horarios"><svg className="location-icon" aria-hidden="true"><use href="#i-clock"></use></svg>Horários</a>
            </li>
            <li>
              <a href="#localizacao"><svg className="location-icon" aria-hidden="true"><use href="#i-pin"></use></svg>Localização</a>
            </li>
            <li>
              <a href="#avaliacoes"><svg className="location-icon" aria-hidden="true"><use href="#i-star"></use></svg>Avaliações</a>
            </li>
            <li>
              <a href="#feedbacks"><svg className="location-icon" aria-hidden="true"><use href="#i-home"></use></svg>Moradores</a>
            </li>
            <li>
              <a href="#roteiros"><svg className="location-icon" aria-hidden="true"><use href="#i-map"></use></svg>Roteiros</a>
            </li>
            <li>
              <a href="#destinos"><svg className="location-icon" aria-hidden="true"><use href="#i-compass"></use></svg>Outros locais</a>
            </li>
          </ul>
        </div>
        <i className="location-scroll-progress" id="lProg"></i>
      </nav>
    </>
  );
}
