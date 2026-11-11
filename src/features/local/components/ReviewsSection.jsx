import { useState } from "react";
import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

function Stars({ value }) {
  return <span className="stars" aria-label={`${value} de 5 estrelas`}>{Array.from({ length: 5 }, (_, index) => <LegacyIcon key={index} name="star" className={index < value ? "on" : ""} />)}</span>;
}

export default function ReviewsSection({ reviews, sort, onSort, role, onAdd, onReport }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const submit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onAdd({ rating, text: text.trim() });
    setText("");
  };
  return <section className="lsec w" id="avaliacoes"><div className="wrap"><SectionHeader icon="star" badge="Avaliações">O que dizem <em className="hl">os visitantes</em></SectionHeader><div className="l2"><div className="rv"><div className="lcard t sum"><div className="avg"><b>{average.toFixed(1).replace(".", ",")}</b><Stars value={Math.round(average)} /><small>{reviews.length} avaliações</small></div><div className="bars">{[5, 4, 3, 2, 1].map((score) => { const count = reviews.filter((review) => review.rating === score).length; return <div key={score}><span>{score}</span><i><b style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }} /></i><small>{count}</small></div>; })}</div></div><div className="revbar"><b>{reviews.length} comentários</b><label>Ordenar <select value={sort} onChange={(event) => onSort(event.target.value)}><option value="recentes">Mais recentes</option><option value="melhor">Melhor nota</option><option value="pior">Pior nota</option></select></label></div><ul className="revs">{reviews.map((review) => <li className="rev" key={review.id}><span className="av">{review.author[0]}</span><div><div className="rhd"><b>{review.author}</b><small>{review.date}</small></div><Stars value={review.rating} /><p>{review.text}</p></div></li>)}</ul></div><aside className="lcard rv"><h3 className="h-ic"><LegacyIcon name="pen" />Avaliar este local</h3>{role === "visitante" ? <div className="lock"><LegacyIcon name="lock" /><span>Escolha “Usuário” no modo demonstração para avaliar.</span></div> : <form className="lform" onSubmit={submit}><div className="fld"><b className="lbl">Sua nota</b><span className="rate simple">{[1, 2, 3, 4, 5].map((score) => <button key={score} type="button" onClick={() => setRating(score)} aria-pressed={rating === score} aria-label={`${score} estrelas`}><LegacyIcon name="star" /></button>)}</span></div><label>Comentário<textarea maxLength="400" value={text} onChange={(event) => setText(event.target.value)} placeholder="Conte como foi a sua visita" /></label><button className="btn" type="submit">Publicar avaliação</button></form>}<hr /><button className="btn ghost" type="button" onClick={onReport}><LegacyIcon name="flag" />Reportar um problema</button></aside></div></div></section>;
}
