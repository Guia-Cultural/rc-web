import LegacyIcon from "../../../components/common/LegacyIcon";
import { localImage } from "../data/images";
import { places, themes } from "../data/localData";

export default function LocalHero({ place, isFavorite, onFavorite, onShare, onChoosePlace }) {
  const theme = themes[place.theme];
  const nameParts = place.name.split(" ");
  const highlightedName = nameParts.pop();
  const now = new Date();
  const today = place.hours[now.getDay()];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMinute] = today.open.split(":").map(Number);
  const [closeHour, closeMinute] = today.close.split(":").map(Number);
  const isOpen = currentMinutes >= openHour * 60 + openMinute && currentMinutes <= closeHour * 60 + closeMinute;

  return (
    <section className="lhero" id="topo" aria-label="Apresentação do local">
      <img className="bg show" src={localImage(theme.hero)} alt="" />
      <div className="fx" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <span className="pt" key={index} style={{ "--x": `${(index * 17) % 100}%`, "--del": `${-index * 0.7}s` }} />)}
      </div>
      <LegacyIcon name={theme.icon} className="bigico" />
      <div className="wrap lhero-in">
        <nav className="crumbs" aria-label="Você está em"><a href="/">Home</a><LegacyIcon name="chev-r" /><a href="/#destinos">Destinos</a><LegacyIcon name="chev-r" /><span>{place.category}</span></nav>
        <p className="kick">viva experiências <b>{theme.adjective}</b></p>
        <h1 className="lh1">{nameParts.join(" ")} <em>{highlightedName}</em></h1>
        <p className="ltag">{place.tag}</p>
        <div className="lmeta"><span className="lchip"><LegacyIcon name="pin" />{place.location}</span><span className="lchip"><LegacyIcon name="star" />4,5 · 2 avaliações</span><span className="lchip"><LegacyIcon name="dollar" />{place.paid ? "Pago" : "Grátis"}</span><span className={`lchip ${isOpen ? "ok" : "no"}`}><LegacyIcon name="clock" />{isOpen ? `Aberto agora · fecha às ${today.close}` : `Fechado · abre às ${today.open}`}</span></div>
        <div className="lact">
          <button className="btn" type="button" onClick={onFavorite} aria-pressed={isFavorite}><LegacyIcon name="heart" /><span>{isFavorite ? "Favoritado" : "Favoritar"}</span></button>
          <button className="btn line" type="button" onClick={onShare}><LegacyIcon name="share" />Compartilhar</button>
          <a className="btn line" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.location}`)}`} target="_blank" rel="noopener noreferrer"><LegacyIcon name="nav" />Como chegar</a>
        </div>
      </div>
      <div className="wrap"><div className="glass" role="group" aria-label="Escolha o estilo do local">
        <div className="lst-h"><LegacyIcon name="sparkles" /><b>Escolha o estilo do local</b><small>A página inteira muda de clima</small></div>
        <div className="sty-row">
          {Object.entries(themes).map(([key, item]) => {
            const target = places.find((candidate) => candidate.theme === key);
            return <button key={key} className="sty" type="button" aria-pressed={key === place.theme} onClick={() => onChoosePlace(target.slug)}><img src={localImage(item.card)} alt="" />{item.label}</button>;
          })}
        </div>
      </div></div>
    </section>
  );
}
