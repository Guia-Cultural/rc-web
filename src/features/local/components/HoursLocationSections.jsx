import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

export function HoursSection({ place }) {
  const now = new Date();
  const today = place.hours[now.getDay()];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMinute] = today.open.split(":").map(Number);
  const [closeHour, closeMinute] = today.close.split(":").map(Number);
  const isOpen = currentMinutes >= openHour * 60 + openMinute && currentMinutes <= closeHour * 60 + closeMinute;
  return <section className="lsec w" id="horarios"><div className="wrap"><SectionHeader icon="clock" badge="Horários">Quando <em className="hl">visitar</em></SectionHeader><div className="l2"><div className="lcard t rv"><div className={`live ${isOpen ? "open" : ""}`}><i /><b>{isOpen ? "Aberto agora" : "Fechado agora"}</b></div><p>{isOpen ? `Aberto até ${today.close}` : `Hoje: ${today.open}–${today.close}`}</p><table className="hrs"><tbody>{place.hours.map((item, index) => <tr key={item.day} className={index === now.getDay() ? "today" : ""}><td>{item.day}</td><td>{item.open} – {item.close}</td></tr>)}</tbody></table></div><aside className="lcard rv"><h3>Ingresso</h3><p className="price-big">{place.paid ? "Consulte" : "Grátis"}</p><p>{place.price}</p><p className="demo-note">Horários e valores de exemplo para demonstração.</p></aside></div></div></section>;
}

export function LocationSection({ place }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.location}`)}`;
  return <section className="lsec" id="localizacao"><div className="wrap"><SectionHeader icon="pin" badge="Localização">Como <em className="hl">chegar</em></SectionHeader><div className="maps"><div className="lcard addr rv"><p><LegacyIcon name="pin" /><span>{place.address}</span></p><p><LegacyIcon name="map" /><span>{place.location}</span></p><a className="btn" href={mapUrl} target="_blank" rel="noopener noreferrer"><LegacyIcon name="nav" />Abrir no mapa</a></div><div className="mapc rv"><svg className="map" viewBox="0 0 600 360" aria-hidden="true"><rect width="600" height="360" fill="var(--ts)" /><path d="M0 250C120 210 200 300 330 260S520 190 600 230V360H0Z" fill="var(--t)" opacity=".4" /><g stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none"><path d="M-10 120H610" /><path d="M180 -10V370" /><path d="M420 -10 360 370" /><path d="M-10 60 200 130" /></g><g fill="#fff" opacity=".85"><rect x="40" y="30" width="110" height="70" rx="12" /><rect x="210" y="20" width="150" height="80" rx="12" /><rect x="440" y="30" width="120" height="60" rx="12" /></g><circle cx="312" cy="166" r="46" fill="var(--t)" opacity=".28" /></svg><span className="pinm"><LegacyIcon name="pin" /></span><small>Mapa ilustrativo</small></div></div></div></section>;
}
