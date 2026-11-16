import { useNavigate } from "react-router-dom";
import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

export function ResidentTipsSection({ tips, user, place, onRegister, onManage }) {
  const canCreate = user?.role === "NATIVO" || user?.role === "ADMIN";
  const canEdit = user && (user.role === "ADMIN" || Number(user.id) === Number(place.userId));

  const actions = (
    <div className="lact">
      {canEdit && (
        <button className="btn" type="button" onClick={onManage}>
          <LegacyIcon name="settings" />
          Editar local e fotos
        </button>
      )}
      {canCreate && (
        <button className="btn ghost" type="button" onClick={onRegister}>
          <LegacyIcon name="plus" />
          Cadastrar novo local
        </button>
      )}
    </div>
  );

  return (
    <section className="lsec s" id="feedbacks">
      <div className="wrap">
        <SectionHeader
          icon="home"
          badge="Nativos"
          lead="Colaboradores nativos podem submeter novos locais culturais para avaliação."
          split
          action={actions}
        >
          Contribuições de <em className="hl">quem mora aqui</em>
        </SectionHeader>
        <div className="fbs">
          {tips.map((tip) => (
            <article className="fb rv" key={tip.id}>
              <span className="av">{tip.author[0]}</span>
              <div>
                <h3>{tip.author}</h3>
                <small>{tip.role} (exemplo ilustrativo)</small>
                <p>“{tip.text}”</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisitorRoutesSection({ routes, place }) {
  const navigate = useNavigate();

  return (
    <section className="lsec w" id="roteiros">
      <div className="wrap">
        <SectionHeader
          icon="map"
          badge="Roteiros"
          lead="Planeje um roteiro real passando por este destino na nossa ferramenta de itinerários."
          split
          action={
            <button
              className="btn"
              type="button"
              onClick={() => navigate(`/roteiros?destino=${encodeURIComponent(place.city)}`)}
            >
              <LegacyIcon name="plus" />
              Criar roteiro para {place.city}
            </button>
          }
        >
          Roteiros sugeridos <em className="hl">(modelos ilustrativos)</em>
        </SectionHeader>
        <div className="rgrid">
          {routes.map((route) => (
            <article className="rcard rv" key={route.id}>
              <div className="rct">
                <span className="av">{route.author[0]}</span>
                <div>
                  <b>{route.author}</b>
                  <small>
                    {route.duration} · {route.budget}
                  </small>
                </div>
              </div>
              <h3>{route.title}</h3>
              <ol>
                {route.stops.map((stop) => (
                  <li key={stop}>{stop}</li>
                ))}
              </ol>
              <div className="rcb">
                <span>
                  <LegacyIcon name="heart" />
                  {route.likes}
                </span>
                <button
                  className="btn ghost xs"
                  type="button"
                  onClick={() => navigate(`/roteiros?destino=${encodeURIComponent(place.city)}`)}
                >
                  Usar como base
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
