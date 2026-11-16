import LegacyIcon from "../../../components/common/LegacyIcon";
import { budgetProfiles } from "../data/roteiroData";
import StepHeader from "./StepHeader";

const costFields = [
  ["lodging", "Hospedagem", "r-bed"],
  ["food", "Alimentação", "r-fork"],
  ["tickets", "Ingressos", "r-ticket"],
  ["transport", "Transporte", "r-bus"],
];
const brl = (value) => `R$ ${Math.round(value).toLocaleString("pt-BR")}`;

export function BudgetStep({ form, update, totals, groupCount }) {
  return (
    <section className="lsec solid" id="preco">
      <div className="wrap">
        <StepHeader
          icon="dollar"
          badge="Orçamento"
          lead="Escolha o estilo de gasto e distribua o valor por pessoa. A gente calcula o orçamento total da viagem."
        >
          Quanto você quer <em className="hl">gastar?</em>
        </StepHeader>
        <div className="picks rv">
          {budgetProfiles.map(([name, description, icon]) => (
            <button
              className="pk"
              type="button"
              key={name}
              aria-pressed={form.budgetProfile === name}
              onClick={() => update({ budgetProfile: name })}
            >
              <span className="pi">
                <LegacyIcon name={icon} />
              </span>
              <b>{name}</b>
              <small>{description}</small>
            </button>
          ))}
        </div>
        <div className="costs rv">
          {costFields.map(([key, label, icon]) => (
            <div className="cost" key={key}>
              <span className="pi">
                <LegacyIcon name={icon} />
              </span>
              <b>{label}</b>
              <label>
                R$
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={form.costs[key] || ""}
                  onChange={(event) =>
                    update({ costs: { ...form.costs, [key]: Number(event.target.value) } })
                  }
                  aria-label={`${label} por pessoa`}
                />
              </label>
            </div>
          ))}
        </div>
        <div className="total rv">
          <div>
            <small>Total por pessoa</small>
            <b>{brl(totals.perPerson)}</b>
          </div>
          <div>
            <small>Média por dia</small>
            <b>{brl(totals.perDay)}</b>
          </div>
          <div>
            <small>Total do grupo ({groupCount})</small>
            <b>{brl(totals.group)}</b>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GenerateStep({
  form,
  error,
  submitting,
  isAuthenticated,
  onGenerate,
  onReset,
}) {
  const selected = [
    form.destination,
    form.startDate && form.endDate ? `${form.startDate} a ${form.endDate}` : "",
    `${form.days} dias`,
    form.group,
    form.pace,
    `${form.categoryIds.length} preferências`,
    `${form.attractions.length} atrações escolhidas`,
  ].filter(Boolean);

  return (
    <section className="lsec w" id="gerar">
      <div className="wrap">
        <StepHeader
          icon="sparkles"
          badge="Plano de viagem"
          lead={
            isAuthenticated
              ? "Vamos salvar sua viagem, suas preferências e distribuir as atrações reais no seu itinerário no banco de dados."
              : "Gere uma prévia com recomendações reais ou entre na sua conta para salvar viagem e itinerário no banco."
          }
        >
          Pronto para <em className="hl">gerar?</em>
        </StepHeader>
        <div className="lcard rv pubc">
          <div className="smy">
            {selected.length ? (
              selected.map((item) => (
                <span key={item}>
                  <LegacyIcon name="check" />
                  {item}
                </span>
              ))
            ) : (
              <p>Suas escolhas vão aparecer aqui.</p>
            )}
          </div>
          <p className="perr" role="alert">
            {error}
          </p>
          <div className="lact">
            <button className="btn" type="button" onClick={onGenerate} disabled={submitting}>
              <LegacyIcon name="sparkles" />
              {submitting
                ? "Gerando roteiro..."
                : isAuthenticated
                  ? "Gerar e salvar roteiro"
                  : "Gerar prévia do roteiro"}
            </button>
            <button className="btn ghost" type="button" onClick={onReset} disabled={submitting}>
              Recomeçar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
