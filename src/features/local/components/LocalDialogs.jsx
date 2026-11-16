import { useState } from "react";
import LegacyIcon from "../../../components/common/LegacyIcon";

function DialogShell({ title, icon, children, onClose, wide = false }) {
  return (
    <dialog
      className={`ldlg ${wide ? "bigdlg" : ""}`}
      open
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="dialog-inner">
        <button className="dr-x dialog-close" type="button" onClick={onClose} aria-label="Fechar">
          <LegacyIcon name="x" />
        </button>
        <h3>
          <LegacyIcon name={icon} />
          {title}
        </h3>
        {children}
      </div>
    </dialog>
  );
}

function PlaceDialog({ categories = [], onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    catId: categories[0]?.id ? String(categories[0].id) : "",
    price: "GRATUITO",
    estimatedCost: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "Brasil",
    latitude: "",
    longitude: "",
    businessHours: "",
    officialWebsite: "",
    ticketLink: "",
    contact: "",
  });
  const [files, setFiles] = useState([]);
  const [createdPlaceId, setCreatedPlaceId] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await onCreate(
        {
          ...form,
          catId: Number(form.catId),
          estimatedCost: form.estimatedCost !== "" ? Number(form.estimatedCost) : null,
          latitude: form.latitude !== "" ? Number(form.latitude) : null,
          longitude: form.longitude !== "" ? Number(form.longitude) : null,
        },
        files,
        createdPlaceId
      );
    } catch (err) {
      if (err?.createdPlaceId) {
        setCreatedPlaceId(err.createdPlaceId);
      }
      setError(err.message || "Não foi possível cadastrar o local.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <DialogShell title="Cadastrar local cultural" icon="plus" onClose={onClose} wide>
      <p className="hint">
        Locais cadastrados por perfis Nativo iniciam com status EM_AVALIACAO até aprovação por um administrador.
      </p>
      {error && <p style={{ color: "#b91c1c", fontWeight: 700 }}>{error}</p>}
      <form className="lform" onSubmit={handleSubmit}>
        <div className="pgrid">
          <h4>1. Informações</h4>
          <label className="full">
            Nome do local
            <input
              required
              maxLength={150}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </label>
          <label>
            Categoria
            <select
              required
              value={form.catId}
              onChange={(e) => setForm((p) => ({ ...p, catId: e.target.value }))}
            >
              <option value="">Selecione</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Faixa de preço
            <select
              value={form.price}
              onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            >
              <option value="GRATUITO">Gratuito</option>
              <option value="BARATO">Barato</option>
              <option value="MODERADO">Moderado</option>
              <option value="CARO">Caro</option>
            </select>
          </label>
          <label>
            Custo estimado (R$, opcional)
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.estimatedCost}
              onChange={(e) => setForm((p) => ({ ...p, estimatedCost: e.target.value }))}
            />
          </label>
          <label>
            Horário de funcionamento
            <input
              required
              maxLength={150}
              placeholder="Terça a Domingo: 09h às 17h"
              value={form.businessHours}
              onChange={(e) => setForm((p) => ({ ...p, businessHours: e.target.value }))}
            />
          </label>
          <label className="full">
            Descrição
            <textarea
              required
              maxLength={500}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            />
          </label>

          <h4>2. Endereço e localização</h4>
          <label className="full">
            Endereço
            <input
              required
              maxLength={150}
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            />
          </label>
          <label>
            Cidade
            <input
              required
              maxLength={100}
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            />
          </label>
          <label>
            UF / Estado
            <input
              required
              maxLength={150}
              value={form.state}
              onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
            />
          </label>
          <label>
            Latitude (opcional)
            <input
              type="number"
              step="any"
              placeholder="-23.55052"
              value={form.latitude}
              onChange={(e) => setForm((p) => ({ ...p, latitude: e.target.value }))}
            />
          </label>
          <label>
            Longitude (opcional)
            <input
              type="number"
              step="any"
              placeholder="-46.63331"
              value={form.longitude}
              onChange={(e) => setForm((p) => ({ ...p, longitude: e.target.value }))}
            />
          </label>

          <h4>3. Imagens (JPG, PNG ou WEBP)</h4>
          <label className="full">
            Fotos do local
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </label>

          <h4>4. Canais oficiais (opcional)</h4>
          <label>
            Site oficial
            <input
              type="url"
              placeholder="https://"
              value={form.officialWebsite}
              onChange={(e) => setForm((p) => ({ ...p, officialWebsite: e.target.value }))}
            />
          </label>
          <label>
            Link de ingressos
            <input
              type="url"
              placeholder="https://"
              value={form.ticketLink}
              onChange={(e) => setForm((p) => ({ ...p, ticketLink: e.target.value }))}
            />
          </label>
          <label className="full">
            Contato
            <input
              maxLength={150}
              value={form.contact}
              onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))}
            />
          </label>
        </div>

        <div className="row">
          <button className="btn ghost" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Enviando..." : createdPlaceId ? "Reenviar fotos" : "Enviar cadastro"}
          </button>
        </div>
      </form>
    </DialogShell>
  );
}

function ManageDialog({ place, categories = [], onClose, onUpdate, onDeleteImage }) {
  const [form, setForm] = useState({
    name: place.name || "",
    description: place.description || "",
    catId: place.catId ? String(place.catId) : categories[0]?.id ? String(categories[0].id) : "",
    address: place.address || "",
    city: place.city || "",
    state: place.state || "",
    country: place.country || "Brasil",
    latitude: place.latitude ?? "",
    longitude: place.longitude ?? "",
    businessHours: place.businessHours || "",
    price: place.price || "GRATUITO",
    estimatedCost: place.estimatedCost ?? "",
    officialWebsite: place.officialWebsite || "",
    ticketLink: place.ticketLink || "",
    contact: place.contact || "",
  });
  const [newFiles, setNewFiles] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await onUpdate(
        {
          ...form,
          catId: Number(form.catId),
          estimatedCost: form.estimatedCost !== "" ? Number(form.estimatedCost) : null,
          latitude: form.latitude !== "" ? Number(form.latitude) : null,
          longitude: form.longitude !== "" ? Number(form.longitude) : null,
        },
        newFiles
      );
    } catch (err) {
      setError(err.message || "Erro ao atualizar local.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <DialogShell title="Editar local e galeria" icon="settings" onClose={onClose} wide>
      {error && <p style={{ color: "#b91c1c", fontWeight: 700 }}>{error}</p>}
      <form className="lform" onSubmit={handleSubmit}>
        <div className="pgrid">
          <label className="full">
            Nome
            <input
              required
              maxLength={150}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </label>
          <label className="full">
            Descrição
            <textarea
              required
              maxLength={500}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            />
          </label>
          <label>
            Categoria
            <select
              required
              value={form.catId}
              onChange={(e) => setForm((p) => ({ ...p, catId: e.target.value }))}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Faixa de preço
            <select
              value={form.price}
              onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            >
              <option value="GRATUITO">Gratuito</option>
              <option value="BARATO">Barato</option>
              <option value="MODERADO">Moderado</option>
              <option value="CARO">Caro</option>
            </select>
          </label>
          <label className="full">
            Horário de funcionamento
            <input
              required
              maxLength={150}
              value={form.businessHours}
              onChange={(e) => setForm((p) => ({ ...p, businessHours: e.target.value }))}
            />
          </label>
          <label className="full">
            Adicionar novas imagens (JPG, PNG, WEBP)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => setNewFiles(Array.from(e.target.files || []))}
            />
          </label>
        </div>

        {place.uploadedImages?.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <h4>Imagens enviadas</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
              {place.uploadedImages.map((img) => (
                <div key={img.id} style={{ display: "flex", flexDirection: "column", gap: 4, width: 110 }}>
                  <img
                    src={img.url}
                    alt={img.name}
                    style={{ width: 110, height: 75, objectFit: "cover", borderRadius: 8 }}
                  />
                  <button
                    type="button"
                    className="btn ghost xs"
                    onClick={() => onDeleteImage(img.id)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn ghost" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
    </DialogShell>
  );
}

export function Lightbox({ place, index, onIndex, onClose }) {
  const photos = place.gallery || [];
  if (!photos.length) return null;
  const safeIndex = ((index % photos.length) + photos.length) % photos.length;
  const previous = () => onIndex((safeIndex - 1 + photos.length) % photos.length);
  const next = () => onIndex((safeIndex + 1) % photos.length);

  return (
    <dialog
      className="ldlg"
      open
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <img
        className="lightbox-image"
        src={photos[safeIndex].url}
        alt={photos[safeIndex].name || `${place.name}, foto ${safeIndex + 1}`}
      />
      <div className="bar2">
        <button type="button" onClick={previous} aria-label="Foto anterior">
          <LegacyIcon name="chev-l" />
        </button>
        <span>
          {safeIndex + 1} / {photos.length}
        </span>
        <button type="button" onClick={next} aria-label="Próxima foto">
          <LegacyIcon name="chev-r" />
        </button>
        <button type="button" onClick={onClose} aria-label="Fechar">
          <LegacyIcon name="x" />
        </button>
      </div>
    </dialog>
  );
}

export default function LocalDialogs({
  modal,
  place,
  categories,
  onClose,
  onCreatePlace,
  onUpdatePlace,
  onDeleteImage,
}) {
  if (!modal) return null;
  if (modal === "place") {
    return <PlaceDialog categories={categories} onClose={onClose} onCreate={onCreatePlace} />;
  }
  if (modal === "manage" && place) {
    return (
      <ManageDialog
        place={place}
        categories={categories}
        onClose={onClose}
        onUpdate={onUpdatePlace}
        onDeleteImage={onDeleteImage}
      />
    );
  }
  return null;
}
