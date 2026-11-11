import LegacyIcon from "../../../components/common/LegacyIcon";
import { localImage } from "../data/images";
import { themes } from "../data/localData";

function DialogShell({ title, icon, children, onClose, wide = false }) {
  return <dialog className={`ldlg ${wide ? "bigdlg" : ""}`} open onClick={(event) => event.target === event.currentTarget && onClose()}><div className="dialog-inner"><button className="dr-x dialog-close" type="button" onClick={onClose} aria-label="Fechar"><LegacyIcon name="x" /></button><h3><LegacyIcon name={icon} />{title}</h3>{children}</div></dialog>;
}

function ReportDialog({ onClose, onSubmit }) {
  return <DialogShell title="Reportar um problema" icon="flag" onClose={onClose}><form className="lform" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); onSubmit({ reason: data.get("reason"), text: data.get("text") }); }}><label>Motivo<select name="reason"><option>Informação incorreta</option><option>Local fechado ou mudou de endereço</option><option>Conteúdo inadequado</option><option>Outro</option></select></label><label>Detalhes<textarea name="text" required maxLength="400" placeholder="Explique o que encontrou" /></label><div className="row"><button className="btn ghost" type="button" onClick={onClose}>Cancelar</button><button className="btn" type="submit">Enviar denúncia</button></div></form></DialogShell>;
}

function TipDialog({ onClose, onSubmit }) {
  return <DialogShell title="Escrever uma dica de morador" icon="home" onClose={onClose}><form className="lform" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); onSubmit({ author: data.get("author"), text: data.get("text") }); }}><label>Seu nome<input name="author" required maxLength="40" /></label><label>Sua dica<textarea name="text" required maxLength="300" placeholder="O que quem mora aqui sabe e os guias não contam?" /></label><div className="row"><button className="btn ghost" type="button" onClick={onClose}>Cancelar</button><button className="btn" type="submit">Publicar dica</button></div></form></DialogShell>;
}

function RouteDialog({ place, onClose, onSubmit }) {
  return <DialogShell title="Criar meu roteiro" icon="map" onClose={onClose}><p className="hint">Inclua {place.name} no seu plano.</p><form className="lform" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); onSubmit({ title: data.get("title"), duration: data.get("duration"), budget: data.get("budget"), stops: String(data.get("stops")).split("\n").filter(Boolean) }); }}><label>Título<input name="title" required maxLength="70" placeholder="Ex.: Fim de semana nas cachoeiras" /></label><div className="pgrid"><label>Duração<select name="duration"><option>Meio dia</option><option>1 dia</option><option>2 dias</option><option>3 dias ou mais</option></select></label><label>Orçamento<select name="budget"><option>Econômico</option><option>Moderado</option><option>Confortável</option></select></label></div><label>Paradas<textarea name="stops" required placeholder={"9h: chegada\n11h: trilha leve\n13h: almoço"} /></label><div className="row"><button className="btn ghost" type="button" onClick={onClose}>Cancelar</button><button className="btn" type="submit">Publicar roteiro</button></div></form></DialogShell>;
}

function PlaceDialog({ onClose, onComplete }) {
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  return <DialogShell title="Cadastrar local" icon="plus" onClose={onClose} wide><p className="hint">Cadastro demonstrativo: os dados ficam somente nesta tela e aguardam uma API futura para envio real.</p><form className="lform" onSubmit={(event) => { event.preventDefault(); onComplete("Cadastro validado localmente; nenhuma informação foi enviada a um servidor."); }}><div className="pgrid"><h4>1. Informações</h4><label className="full">Nome do local<input required name="name" maxLength="80" /></label><label>Estilo do local<select required><option value="">Selecione</option><option>Natureza</option><option>Histórico</option><option>Praias</option><option>Cidades</option><option>Aventura</option></select></label><label>Entrada<select><option>Gratuita</option><option>Paga</option></select></label><label className="full">Descrição<textarea required maxLength="600" /></label><h4>2. Endereço e localização</h4><label>CEP<input inputMode="numeric" maxLength="9" placeholder="00000-000" /></label><label>Endereço<input required /></label><label>Cidade<input required /></label><label>UF<input required maxLength="2" /></label><label>Latitude<input inputMode="decimal" placeholder="-23.55052" /></label><label>Longitude<input inputMode="decimal" placeholder="-46.63331" /></label><h4>3. Horários</h4><div className="days full">{days.map((day) => <div className="day" key={day}><b>{day}</b><input type="time" defaultValue="09:00" aria-label={`Abre ${day}`} /><input type="time" defaultValue="17:00" aria-label={`Fecha ${day}`} /><label><input type="checkbox" />Fechado</label></div>)}</div><h4>4. Destaques e detalhes (opcional)</h4><label>Destaque 1<input /></label><label>Destaque 2<input /></label><label>Duração sugerida<input /></label><label>Acessibilidade<input /></label><h4>5. Fotos (até 4)</h4><label className="full">Fotos<input type="file" accept="image/*" multiple /></label><h4>6. Contato (opcional)</h4><label>Telefone<input type="tel" /></label><label>E-mail<input type="email" /></label><label className="full">Site<input type="url" placeholder="https://" /></label></div><div className="row"><button className="btn ghost" type="button" onClick={onClose}>Cancelar</button><button className="btn" type="submit">Enviar cadastro</button></div></form></DialogShell>;
}

function ManageDialog({ place, onClose, onComplete }) {
  return <DialogShell title="Gerenciar local" icon="settings" onClose={onClose}><form className="lform" onSubmit={(event) => { event.preventDefault(); onComplete("Alterações demonstrativas validadas localmente."); }}><label>Descrição<textarea defaultValue={place.description} maxLength="500" /></label><label>Informação de ingresso<input defaultValue={place.price} maxLength="120" /></label><div className="row"><button className="btn ghost" type="button" onClick={onClose}>Cancelar</button><button className="btn" type="submit">Salvar alterações</button></div></form></DialogShell>;
}

export function Lightbox({ place, index, onIndex, onClose }) {
  const photos = themes[place.theme].gallery;
  const previous = () => onIndex((index - 1 + photos.length) % photos.length);
  const next = () => onIndex((index + 1) % photos.length);
  return <dialog className="ldlg" open onClick={(event) => event.target === event.currentTarget && onClose()}><img className="lightbox-image" src={localImage(photos[index])} alt={`${place.name}, foto ${index + 1}`} /><div className="bar2"><button type="button" onClick={previous} aria-label="Foto anterior"><LegacyIcon name="chev-l" /></button><span>{index + 1} / {photos.length}</span><button type="button" onClick={next} aria-label="Próxima foto"><LegacyIcon name="chev-r" /></button><button type="button" onClick={onClose} aria-label="Fechar"><LegacyIcon name="x" /></button></div></dialog>;
}

export default function LocalDialogs({ modal, place, onClose, onReport, onTip, onRoute, onComplete }) {
  if (!modal) return null;
  if (modal === "report") return <ReportDialog onClose={onClose} onSubmit={onReport} />;
  if (modal === "tip") return <TipDialog onClose={onClose} onSubmit={onTip} />;
  if (modal === "route") return <RouteDialog place={place} onClose={onClose} onSubmit={onRoute} />;
  if (modal === "place") return <PlaceDialog onClose={onClose} onComplete={onComplete} />;
  if (modal === "manage") return <ManageDialog place={place} onClose={onClose} onComplete={onComplete} />;
  return null;
}
