import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

export default function InformationSection({ place }) {
  return (
    <section className="lsec w" id="informacoes">
      <div className="wrap">
        <SectionHeader icon="info" badge="Informações">
          Sobre <em className="hl">{place.name}</em>
        </SectionHeader>
        <div className="l2">
          <div className="rv">
            <p className="desc">{place.description}</p>
            <div className="icards">
              <div className="icard">
                <LegacyIcon name="sparkles" />
                <b>{place.category}</b>
              </div>
              <div className="icard">
                <LegacyIcon name="compass" />
                <b>
                  {place.city} - {place.state}
                </b>
              </div>
              <div className="icard">
                <LegacyIcon name="users" />
                <b>Cadastrado por {place.creatorName || "Equipe Rota Cultural"}</b>
              </div>
            </div>
          </div>

          <aside className="lcard t ficha rv">
            <h3>Ficha do local</h3>
            <dl>
              <dt>Categoria</dt>
              <dd>{place.category}</dd>
              <dt>Faixa de preço</dt>
              <dd>{place.priceLabel}</dd>
              <dt>Funcionamento</dt>
              <dd>{place.businessHours}</dd>
              <dt>Endereço</dt>
              <dd>{place.address}</dd>
              {place.officialWebsite && (
                <>
                  <dt>Site oficial</dt>
                  <dd>
                    <a href={place.officialWebsite} target="_blank" rel="noopener noreferrer">
                      Acessar site oficial
                    </a>
                  </dd>
                </>
              )}
              {place.ticketLink && (
                <>
                  <dt>Ingressos</dt>
                  <dd>
                    <a href={place.ticketLink} target="_blank" rel="noopener noreferrer">
                      Bilheteria oficial
                    </a>
                  </dd>
                </>
              )}
              {place.contact && (
                <>
                  <dt>Contato</dt>
                  <dd>{place.contact}</dd>
                </>
              )}
            </dl>
          </aside>
        </div>

        <div className="stats4">
          <div>
            <LegacyIcon name="clock" />
            <b>{place.businessHours}</b>
            <small>horário informado</small>
          </div>
          <div>
            <LegacyIcon name="pin" />
            <b>
              {place.city}/{place.state}
            </b>
            <small>localização</small>
          </div>
          <div>
            <LegacyIcon name="dollar" />
            <b>{place.priceLabel}</b>
            <small>custo / faixa</small>
          </div>
          <div>
            <LegacyIcon name="star" />
            <b>{place.reviewCount > 0 ? place.averageRating : "—"}</b>
            <small>{place.reviewCount || 0} avaliações</small>
          </div>
        </div>
      </div>
      <div className="rib" aria-hidden="true">
        <div className="trk" />
      </div>
    </section>
  );
}
