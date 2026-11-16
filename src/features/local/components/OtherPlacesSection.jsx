import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

export default function OtherPlacesSection({ places, allPlaces = [], filters, onFilters, onChoose }) {
  const availableStates = [...new Set(allPlaces.map((p) => p.state).filter(Boolean))].sort();

  return (
    <section className="lsec s" id="destinos">
      <div className="wrap">
        <SectionHeader
          icon="compass"
          badge="Destinos"
          lead="Toque em um local aprovado no banco de dados para ver seus detalhes reais."
        >
          Explore <em className="hl">outros locais</em>
        </SectionHeader>
        <div className="tool rv" role="search">
          <label className="fi">
            <LegacyIcon name="search" />
            <span className="sr">Buscar local, cidade ou categoria</span>
            <input
              type="search"
              value={filters.query}
              onChange={(event) => onFilters({ ...filters, query: event.target.value })}
              placeholder="Buscar local, cidade ou categoria"
            />
          </label>
          <label className="fs">
            <span className="sr">Filtrar por estado</span>
            <select
              value={filters.state}
              onChange={(event) => onFilters({ ...filters, state: event.target.value })}
            >
              <option value="">Todos os estados</option>
              {availableStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <LegacyIcon name="chev-d" />
          </label>
          <div className="seg" role="group" aria-label="Preço">
            {[
              ["", "Todos"],
              ["g", "Gratuitos"],
              ["p", "Pagos"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filters.price === value}
                onClick={() => onFilters({ ...filters, price: value })}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="clr"
            onClick={() => onFilters({ query: "", state: "", price: "" })}
          >
            <LegacyIcon name="x" />
            Limpar
          </button>
        </div>

        <p className="hint" aria-live="polite">
          {places.length} {places.length === 1 ? "local encontrado" : "locais encontrados"}
        </p>

        <div className="dgrid">
          {places.map((item) => (
            <article className="dcard rv" key={item.id}>
              <div className="dim">
                <img src={item.cardUrl} alt={item.name} />
                <span>{item.paid ? item.priceLabel : "Grátis"}</span>
              </div>
              <div className="db">
                <small>{item.category}</small>
                <h3>{item.name}</h3>
                <p>
                  <LegacyIcon name="pin" />
                  {item.location}
                </p>
                <button className="btn ghost" type="button" onClick={() => onChoose(item.id)}>
                  Ver local
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
