import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

function Meter({ label, value }) {
  return <div><span>{label}</span><span className="meter"><i style={{ width: `${value * 20}%` }} /></span><b>{value}/5</b></div>;
}

export default function InformationSection({ place }) {
  return (
    <section className="lsec w" id="informacoes"><div className="wrap">
      <SectionHeader icon="info" badge="Informações">Sobre <em className="hl">{place.name}</em></SectionHeader>
      <div className="l2"><div className="rv"><p className="desc">{place.description}</p><div className="icards">{place.highlights.map((highlight, index) => <button className="icard" type="button" key={highlight}><LegacyIcon name={["sparkles", "compass", "users"][index]} /><b>{highlight}</b></button>)}</div></div>
        <aside className="lcard t ficha rv"><h3>Ficha rápida</h3><dl><dt>Melhor época</dt><dd>{place.best}</dd><dt>Duração sugerida</dt><dd>{place.duration}</dd><dt>Ideal para</dt><dd>{place.ideal}</dd><dt>Acessibilidade</dt><dd>{place.accessibility}</dd></dl><p className="demo-note">Dados de exemplo. Confirme valores e horários no site oficial.</p></aside>
      </div>
      <div className="stats4"><div><LegacyIcon name="clock" /><b>{place.duration}</b><small>tempo sugerido</small></div><div><LegacyIcon name="users" /><b>{place.ideal}</b><small>perfil</small></div><div><LegacyIcon name="dollar" /><b>{place.paid ? "Pago" : "Grátis"}</b><small>entrada</small></div><div><LegacyIcon name="star" /><b>4,8</b><small>avaliação</small></div></div>
      <div className="l2b"><div className="lcard an"><h3>Como é a experiência</h3><Meter label="Intensidade" value={place.intensity} /><Meter label="Movimento" value={place.crowd} /></div><div className="lcard an"><h3>O que levar</h3><ul>{place.bring.map((item) => <li key={item}><LegacyIcon name="check" />{item}</li>)}</ul></div></div>
      <div className="tipbox rv"><LegacyIcon name="r-bulb" /><span><b>Dica de quem conhece:</b> {place.tip}</span></div>
    </div><div className="rib" aria-hidden="true"><div className="trk" /></div></section>
  );
}
