import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

export function ResidentTipsSection({ tips, role, onCreate, onRegister }) {
  const actions = <div className="lact">{["morador", "admin"].includes(role) ? <button className="btn" type="button" onClick={onCreate}><LegacyIcon name="plus" />Escrever uma dica</button> : null}{["morador", "admin"].includes(role) ? <button className="btn ghost" type="button" onClick={onRegister}><LegacyIcon name="pin" />Cadastrar um local</button> : null}</div>;
  return <section className="lsec s" id="feedbacks"><div className="wrap"><SectionHeader icon="home" badge="Moradores" lead="Feedbacks de moradores nativos: o que não está nos guias." split action={actions}>Dicas de <em className="hl">quem mora aqui</em></SectionHeader><div className="fbs">{tips.map((tip) => <article className="fb rv" key={tip.id}><span className="av">{tip.author[0]}</span><div><h3>{tip.author}</h3><small>{tip.role}</small><p>“{tip.text}”</p></div></article>)}</div></div></section>;
}

export function VisitorRoutesSection({ routes, onCreate }) {
  return <section className="lsec w" id="roteiros"><div className="wrap"><SectionHeader icon="map" badge="Roteiros" lead="Veja como outras pessoas aproveitaram este local, salve os que gostar e crie o seu." split action={<button className="btn" type="button" onClick={onCreate}><LegacyIcon name="plus" />Criar meu roteiro</button>}>Roteiros de quem <em className="hl">já foi</em></SectionHeader><div className="rgrid">{routes.map((route) => <article className="rcard rv" key={route.id}><div className="rct"><span className="av">{route.author[0]}</span><div><b>{route.author}</b><small>{route.duration} · {route.budget}</small></div></div><h3>{route.title}</h3><ol>{route.stops.map((stop) => <li key={stop}>{stop}</li>)}</ol><div className="rcb"><span><LegacyIcon name="heart" />{route.likes}</span><button className="btn ghost xs" type="button">Salvar</button></div></article>)}</div></div></section>;
}
