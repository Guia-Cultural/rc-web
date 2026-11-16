import { Link } from "react-router-dom";
import LegacyIcon from "../../../components/common/LegacyIcon";

export default function LocalHero({
  place,
  allPlaces = [],
  isFavorite,
  onFavorite,
  onShare,
  onChoosePlace,
}) {
  const theme = place.themeObj;
  const nameParts = place.name.split(" ");
  const highlightedName = nameParts.length > 1 ? nameParts.pop() : "";
  const ratingText =
    place.reviewCount > 0
      ? `${place.averageRating} · ${place.reviewCount} ${place.reviewCount === 1 ? "avaliação" : "avaliações"}`
      : "Sem avaliações ainda";

  const mapsQuery = encodeURIComponent(`${place.name}, ${place.address}, ${place.city}, ${place.state}`);

  return (
    <section className="lhero" id="topo" aria-label="Apresentação do local">
      <img className="bg show" src={place.heroUrl} alt={place.name} />
      <div className="fx" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span
            className="pt"
            key={index}
            style={{ "--x": `${(index * 17) % 100}%`, "--del": `${-index * 0.7}s` }}
          />
        ))}
      </div>
      <LegacyIcon name={theme.icon} className="bigico" />
      <div className="wrap lhero-in">
        <nav className="crumbs" aria-label="Você está em">
          <Link to="/">Home</Link>
          <LegacyIcon name="chev-r" />
          <Link to="/explorar">Explorar</Link>
          <LegacyIcon name="chev-r" />
          <span>{place.category}</span>
        </nav>

        <p className="kick">
          viva experiências <b>{theme.adjective}</b>
          {place.status !== "APROVADO" ? ` · Status: ${place.status}` : ""}
        </p>

        <h1 className="lh1">
          {highlightedName ? (
            <>
              {nameParts.join(" ")} <em>{highlightedName}</em>
            </>
          ) : (
            <em>{place.name}</em>
          )}
        </h1>

        <p className="ltag">{place.description}</p>

        <div className="lmeta">
          <span className="lchip">
            <LegacyIcon name="pin" />
            {place.location}
          </span>
          <span className="lchip">
            <LegacyIcon name="star" />
            {ratingText}
          </span>
          <span className="lchip">
            <LegacyIcon name="dollar" />
            {place.priceLabel}
          </span>
          <span className="lchip ok">
            <LegacyIcon name="clock" />
            {place.businessHours}
          </span>
        </div>

        <div className="lact">
          <button className="btn" type="button" onClick={onFavorite} aria-pressed={isFavorite}>
            <LegacyIcon name="heart" />
            <span>{isFavorite ? "Favoritado" : "Favoritar"}</span>
          </button>
          <button className="btn line" type="button" onClick={onShare}>
            <LegacyIcon name="share" />
            Compartilhar
          </button>
          <a
            className="btn line"
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LegacyIcon name="nav" />
            Como chegar
          </a>
        </div>
      </div>

      {allPlaces.length > 1 && (
        <div className="wrap">
          <div className="glass" role="group" aria-label="Outros locais em destaque">
            <div className="lst-h">
              <LegacyIcon name="sparkles" />
              <b>Troque de local cultural</b>
              <small>Locais reais aprovados na plataforma</small>
            </div>
            <div className="sty-row">
              {allPlaces.slice(0, 8).map((item) => (
                <button
                  key={item.id}
                  className="sty"
                  type="button"
                  aria-pressed={item.id === place.id}
                  onClick={() => onChoosePlace(item.id)}
                >
                  <img src={item.cardUrl} alt="" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
