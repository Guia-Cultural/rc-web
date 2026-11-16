import LegacyIcon from "../../../components/common/LegacyIcon";

const links = [
  ["informacoes", "info", "Informações"], ["fotos", "image", "Fotos"], ["horarios", "clock", "Horários"],
  ["localizacao", "pin", "Localização"], ["avaliacoes", "star", "Avaliações"], ["feedbacks", "home", "Moradores"],
  ["roteiros", "map", "Roteiros"], ["destinos", "compass", "Outros locais"],
];

export default function LocalNavigation() {
  return <nav className="lnav" aria-label="Seções do local"><div className="wrap"><ul>{links.map(([id, icon, label]) => <li key={id}><a href={`#${id}`}><LegacyIcon name={icon} />{label}</a></li>)}</ul></div><i className="lprog" /></nav>;
}
