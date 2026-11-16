import LegacyIcon from "../../../components/common/LegacyIcon";
import { groupSizes } from "../data/roteiroData";
import StepHeader from "./StepHeader";

const ToggleButtons = ({ items, selected, onSelect, multiple = false }) => (
  <div className="cps">
    {items.map((item) => (
      <button
        className="cp"
        type="button"
        key={item}
        aria-pressed={multiple ? selected.includes(item) : selected === item}
        onClick={() => onSelect(item)}
      >
        {item}
      </button>
    ))}
  </div>
);

export function ProfileStep({ form, update }) {
  return (
    <section className="lsec" id="perfil">
      <div className="wrap">
        <StepHeader icon="users" badge="Perfil e datas">
          Quem vai, ritmo e <em className="hl">período</em>
        </StepHeader>
        <div className="l2 rv">
          <div>
            <b className="lbl">Quem vai com você?</b>
            <ToggleButtons
              items={Object.keys(groupSizes)}
              selected={form.group}
              onSelect={(group) => update({ group })}
            />
            <b className="lbl">Qual o ritmo da viagem?</b>
            <ToggleButtons
              items={["Tranquilo", "Equilibrado", "Intenso"]}
              selected={form.pace}
              onSelect={(pace) => update({ pace })}
            />
          </div>

          <div>
            <b className="lbl">Datas da viagem (máximo 30 dias)</b>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 4, fontWeight: 700, fontSize: "0.9rem" }}>
                Início
                <input
                  type="date"
                  className="fi2"
                  style={{ margin: 0 }}
                  value={form.startDate}
                  onChange={(e) => update({ startDate: e.target.value })}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 4, fontWeight: 700, fontSize: "0.9rem" }}>
                Fim
                <input
                  type="date"
                  className="fi2"
                  style={{ margin: 0 }}
                  value={form.endDate}
                  min={form.startDate}
                  onChange={(e) => update({ endDate: e.target.value })}
                />
              </label>
            </div>

            <b className="lbl">Quantos dias?</b>
            <div className="step">
              <button
                type="button"
                onClick={() => update({ days: Math.max(1, form.days - 1) })}
                aria-label="Menos um dia"
              >
                −
              </button>
              <output>{form.days}</output>
              <button
                type="button"
                onClick={() => update({ days: Math.min(30, form.days + 1) })}
                aria-label="Mais um dia"
              >
                +
              </button>
              <span>dias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AttractionsStep({
  form,
  categories = [],
  places = [],
  loading = false,
  toggle,
  update,
  onDetail,
}) {
  return (
    <section className="lsec w" id="cron">
      <div className="wrap">
        <StepHeader
          icon="compass"
          badge="Preferências e Atrações"
          lead="Marque suas categorias culturais de preferência e escolha as atrações reais cadastradas para o seu roteiro."
        >
          Atrações reais para o seu <em className="hl">cronograma</em>
        </StepHeader>

        <div className="picks rv">
          {categories.map((cat) => {
            const pressed = form.categoryIds.includes(cat.id);
            return (
              <button
                className="pk"
                type="button"
                key={cat.id}
                aria-pressed={pressed}
                onClick={() => toggle("categoryIds", cat.id)}
              >
                <span className="pi">
                  <LegacyIcon name="compass" />
                </span>
                <b>{cat.name}</b>
                <small>{pressed ? "Preferência selecionada" : "Clique para priorizar"}</small>
              </button>
            );
          })}
        </div>

        <div className="sgf rv">
          <span>Mostrar:</span>
          {[
            ["all", "Todos"],
            ["free", "Grátis"],
            ["paid", "Pagos"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={form.attractionFilter === value}
              onClick={() => update({ attractionFilter: value })}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && <p className="hint">Carregando atrações aprovadas do servidor...</p>}

        {!loading && places.length === 0 && (
          <div className="lcard" style={{ marginTop: 12 }}>
            <p style={{ margin: 0 }}>
              Nenhum local aprovado encontrado para o destino/filtros selecionados. Limpe os filtros de destino ou categoria ou gere o roteiro para consultar as sugestões disponíveis.
            </p>
          </div>
        )}

        <div className="acards">
          {places.map((item) => {
            const isSelected = form.attractions.includes(item.id);
            return (
              <article className="ac rv" key={item.id}>
                <span className="im">
                  <img src={item.imageUrl} alt={item.name} />
                </span>
                <span className="nt">
                  ★ {item.reviewCount > 0 ? String(item.averageRating).replace(".", ",") : "Novo"}
                </span>
                <span className="bd">
                  <b>{item.name}</b>
                  <small>
                    {item.city}, {item.state} • {item.businessHours}
                  </small>
                  <span className="pr">{item.priceLabel}</span>
                  <span className="card-actions">
                    <button
                      type="button"
                      className="linkbtn"
                      onClick={() =>
                        onDetail({
                          title: item.name,
                          description: item.description,
                          imageUrl: item.imageUrl,
                          rows: [
                            `Categoria: ${item.categoryName || "Cultural"}`,
                            `Endereço: ${item.address}, ${item.city} - ${item.state}`,
                            `Horário: ${item.businessHours}`,
                            `Custo/Faixa: ${item.priceLabel}`,
                          ],
                        })
                      }
                    >
                      Ver detalhes
                    </button>
                    <button
                      type="button"
                      className="btn xs"
                      aria-pressed={isSelected}
                      onClick={() => toggle("attractions", item.id)}
                    >
                      {isSelected ? "Remover" : "Adicionar"}
                    </button>
                  </span>
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
