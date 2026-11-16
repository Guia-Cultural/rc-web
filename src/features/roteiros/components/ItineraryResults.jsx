import { useNavigate } from "react-router-dom";
import LegacyIcon from "../../../components/common/LegacyIcon";
import { roteiroImage } from "../data/images";
import { stays } from "../data/roteiroData";
import StepHeader from "./StepHeader";

const brl = (value) => `R$ ${Math.round(Number(value || 0)).toLocaleString("pt-BR")}`;

export default function ItineraryResults({
  form,
  theme,
  totals,
  itinerary,
  activeDay,
  onDay,
  onEdit,
  onCopy,
  isPreviewMode,
  recommendationInfo,
  onPromptLogin,
}) {
  const navigate = useNavigate();
  const stay = stays.find((item) => item.id === form.stay);
  const active = itinerary[activeDay] || itinerary[0] || { day: 1, dateLabel: "Dia 1", items: [] };

  return (
    <div id="resultado">
      <section className="rhero res" aria-label="Seu roteiro">
        <i className="blob b1" />
        <i className="blob b2" />
        <div className="wrap rh-in">
          <div className="rh-tx">
            <p className="kick">{isPreviewMode ? "prévia do plano para" : "seu roteiro salvo para"}</p>
            <h1 className="lh1">{form.destination}</h1>
            <p className="ltag">
              {form.days} dias ({form.startDate} a {form.endDate}) • {recommendationInfo}
            </p>
            <div className="lmeta">
              <span>
                <LegacyIcon name="calendar" />
                {form.days} dias
              </span>
              <span>
                <LegacyIcon name="users" />
                {form.group}
              </span>
              <span>
                <LegacyIcon name="dollar" />
                {form.budgetProfile || "Orçamento informado"}
              </span>
            </div>
            <div className="lact">
              <button className="btn" type="button" onClick={onEdit}>
                Editar escolhas
              </button>
              <button className="btn line" type="button" onClick={onCopy}>
                Copiar resumo
              </button>
              {isPreviewMode && (
                <button className="btn line" type="button" onClick={onPromptLogin}>
                  Entrar para salvar no banco
                </button>
              )}
            </div>
          </div>
          <div className="rh-col" aria-hidden="true">
            {theme.hero.map((image, index) => (
              <figure className={`pht p${index + 1}`} key={image}>
                <img src={roteiroImage(image)} alt="" />
              </figure>
            ))}
            <LegacyIcon name="plane" className="pln" />
          </div>
        </div>
      </section>

      <section className="lsec w" id="rcustos">
        <div className="wrap">
          <StepHeader icon="dollar" badge="Investimento">
            Orçamento <em className="hl">planejado</em>
          </StepHeader>
          <div className="cost-result">
            <div className="lcard">
              <small>Por pessoa</small>
              <b>{brl(totals.perPerson)}</b>
            </div>
            <div className="lcard">
              <small>Média por dia</small>
              <b>{brl(totals.perDay)}</b>
            </div>
            <div className="lcard">
              <small>Total do grupo</small>
              <b>{brl(totals.group)}</b>
            </div>
          </div>
        </div>
      </section>

      {stay && (
        <section className="lsec" id="rficar">
          <div className="wrap">
            <StepHeader icon="r-bed" badge="Hospedagem">
              Sua <em className="hl">hospedagem</em>
            </StepHeader>
            <article className="stay-result lcard">
              <img src={roteiroImage(stay.image)} alt={stay.name} />
              <div>
                <span className="badge">{stay.name}</span>
                <h3>{stay.name} (referência)</h3>
                <p>{stay.description}</p>
                <ul>
                  {stay.benefits.map((benefit) => (
                    <li key={benefit}>
                      <LegacyIcon name="check" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <b>
                  {brl(stay.price * form.days)} estimados pelas {form.days} diárias
                </b>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="lsec w" id="rdias">
        <div className="wrap">
          <StepHeader
            icon="calendar"
            badge="Cronograma"
            lead="Distribuição gerada pelo backend com locais reais aprovados do banco de dados."
          >
            Seu roteiro, <em className="hl">dia por dia</em>
          </StepHeader>

          <div className="dtabs rv in" role="tablist">
            {itinerary.map((day, index) => (
              <button
                type="button"
                role="tab"
                key={day.day}
                aria-selected={index === activeDay}
                onClick={() => onDay(index)}
              >
                {day.dateLabel}
              </button>
            ))}
          </div>

          <div className="day-result">
            {active.items.length === 0 && (
              <div className="lcard">
                <p style={{ margin: 0 }}>Sem atrações alocadas para este dia. Você pode aproveitar para descanso livre.</p>
              </div>
            )}
            {active.items.map((item, index) => (
              <article className="day-item" key={`${item.locId || item.name}-${index}`}>
                <span className="clock">{item.hours}</span>
                <span className="line" />
                <div style={{ flex: 1 }}>
                  <small>
                    {item.group} {item.city ? `· ${item.city}, ${item.state}` : ""}
                  </small>
                  <h3>{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                  <p>{item.priceLabel}</p>
                  {item.locId && (
                    <button
                      type="button"
                      className="btn ghost xs"
                      style={{ marginTop: 6 }}
                      onClick={() => navigate(`/local/${item.locId}`)}
                    >
                      Ver detalhes do local
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="rib" aria-hidden="true">
          <div className="trk" />
        </div>
      </section>

      <section className="lsec" id="rmapa">
        <div className="wrap">
          <StepHeader icon="map" badge="Mapa" lead="Representação visual das paradas do dia selecionado.">
            Seu trajeto <em className="hl">no mapa</em>
          </StepHeader>
          <div className="route-map rv in">
            <svg viewBox="0 0 900 430" aria-label="Mapa ilustrativo do trajeto">
              <rect width="900" height="430" rx="28" fill="var(--ts)" />
              <path
                d="M80 340C210 190 320 310 430 170S660 70 820 170"
                fill="none"
                stroke="var(--t)"
                strokeWidth="12"
                strokeDasharray="14 14"
                strokeLinecap="round"
              />
              {active.items.map((item, index) => (
                <g
                  key={`${item.name}-${index}`}
                  transform={`translate(${100 + index * Math.min(220, 650 / Math.max(active.items.length - 1, 1))} ${
                    310 - (index % 2) * 150
                  })`}
                >
                  <circle r="25" fill="var(--td)" />
                  <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight="900">
                    {index + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      <section className="lsec w" id="rhor">
        <div className="wrap">
          <StepHeader icon="clock" badge="Horários">
            Quando <em className="hl">ir a cada lugar</em>
          </StepHeader>
          <div className="schedule-table lcard">
            <table>
              <tbody>
                {itinerary.flatMap((day) =>
                  day.items.map((item, idx) => (
                    <tr key={`${day.day}-${item.locId || item.name}-${idx}`}>
                      <td>{day.dateLabel}</td>
                      <td>
                        <b>{item.name}</b>
                      </td>
                      <td>{item.hours}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lsec" id="rdesl">
        <div className="wrap">
          <StepHeader icon="r-bus" badge="Deslocamento">
            Como <em className="hl">se mover</em>
          </StepHeader>
          <div className="opts">
            {(form.transports.length ? form.transports : ["A pé", "Aplicativo"]).map((transport, index) => (
              <article className="op" key={transport}>
                <span className="hd">
                  <LegacyIcon name="r-bus" />
                  {transport}
                </span>
                <b>{index ? "Trechos mais longos" : "Centro e atrações próximas"}</b>
                <small>{index ? "Deslocamento conforme região" : "Ideal para passeios próximos"}</small>
                <span className="pr">{transport === "A pé" ? "Grátis" : "Conforme opção escolhida"}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lsec w" id="rguia">
        <div className="wrap">
          <StepHeader
            icon="shield"
            badge="Orientações"
            lead="Contatos úteis de emergência e recomendações gerais."
          >
            Saúde e <em className="hl">segurança</em>
          </StepHeader>
          <div className="guide-grid">
            <article className="lcard">
              <h3>
                <LegacyIcon name="heart" />
                Emergência no Brasil
              </h3>
              <p>SAMU: 192 · Bombeiros: 193</p>
              <p>Polícia Militar: 190</p>
            </article>
            <article className="lcard">
              <h3>
                <LegacyIcon name="shield" />
                Segurança e planejamento
              </h3>
              <p>Confirme horários de funcionamento em feriados nos sites oficiais dos locais.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
