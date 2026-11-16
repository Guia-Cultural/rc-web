import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

export function HoursSection({ place }) {
  return (
    <section className="lsec w" id="horarios">
      <div className="wrap">
        <SectionHeader icon="clock" badge="Horários">
          Quando <em className="hl">visitar</em>
        </SectionHeader>
        <div className="l2">
          <div className="lcard t rv">
            <div className="live open">
              <i />
              <b>Horário de funcionamento informado</b>
            </div>
            <p style={{ marginTop: 12, fontSize: "1.05rem", fontWeight: 700 }}>{place.businessHours}</p>
            <p className="demo-note">
              Os horários acima refletem exatamente o que está cadastrado no banco de dados. Confirme alterações em feriados no canal oficial.
            </p>
          </div>
          <aside className="lcard rv">
            <h3>Entrada e faixa de preço</h3>
            <p className="price-big">{place.paid ? place.priceLabel : "Grátis"}</p>
            <p>
              {place.estimatedCost !== null && place.estimatedCost !== undefined
                ? `Custo estimado informado: R$ ${Number(place.estimatedCost).toFixed(2)}`
                : "Nenhum valor exato de ingresso cadastrado."}
            </p>
            {place.ticketLink && (
              <a
                className="btn"
                href={place.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 10 }}
              >
                Consultar ingressos oficiais
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

export function LocationSection({ place }) {
  const query =
    place.latitude && place.longitude
      ? `${place.latitude},${place.longitude}`
      : `${place.name}, ${place.address}, ${place.city}, ${place.state}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <section className="lsec" id="localizacao">
      <div className="wrap">
        <SectionHeader icon="pin" badge="Localização">
          Como <em className="hl">chegar</em>
        </SectionHeader>
        <div className="maps">
          <div className="lcard addr rv">
            <p>
              <LegacyIcon name="pin" />
              <span>{place.address}</span>
            </p>
            <p>
              <LegacyIcon name="map" />
              <span>
                {place.city}, {place.state} — {place.country}
              </span>
            </p>
            {place.latitude && place.longitude && (
              <p>
                <LegacyIcon name="compass" />
                <span>
                  Coordenadas: {place.latitude}, {place.longitude}
                </span>
              </p>
            )}
            <a className="btn" href={mapUrl} target="_blank" rel="noopener noreferrer">
              <LegacyIcon name="nav" />
              Abrir no mapa
            </a>
          </div>
          <div className="mapc rv">
            <svg className="map" viewBox="0 0 600 360" aria-hidden="true">
              <rect width="600" height="360" fill="var(--ts)" />
              <path d="M0 250C120 210 200 300 330 260S520 190 600 230V360H0Z" fill="var(--t)" opacity=".4" />
              <g stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none">
                <path d="M-10 120H610" />
                <path d="M180 -10V370" />
                <path d="M420 -10 360 370" />
                <path d="M-10 60 200 130" />
              </g>
              <g fill="#fff" opacity=".85">
                <rect x="40" y="30" width="110" height="70" rx="12" />
                <rect x="210" y="20" width="150" height="80" rx="12" />
                <rect x="440" y="30" width="120" height="60" rx="12" />
              </g>
              <circle cx="312" cy="166" r="46" fill="var(--t)" opacity=".28" />
            </svg>
            <span className="pinm">
              <LegacyIcon name="pin" />
            </span>
            <small>Mapa ilustrativo</small>
          </div>
        </div>
      </div>
    </section>
  );
}
