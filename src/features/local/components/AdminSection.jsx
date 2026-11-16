import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

export default function AdminSection({ place, onUpdateStatus, onManage, onRegister }) {
  const navigate = useNavigate();
  const [rejectionReason, setRejectionReason] = useState(place.rejectionReason || "");

  return (
    <section className="lsec" id="admin">
      <div className="wrap">
        <SectionHeader icon="shield" badge="Administração">
          Área do <em className="hl">administrador</em>
        </SectionHeader>
        <div className="admin rv">
          <h3 className="admh">
            <LegacyIcon name="shield" />
            Moderação deste local
          </h3>
          <div className="row">
            <span>Status atual:</span>
            <span className={`stt ${place.status === "APROVADO" ? "a" : "r"}`}>{place.status}</span>
          </div>
          {place.rejectionReason && (
            <p className="hint" style={{ color: "#b91c1c" }}>
              Motivo da rejeição: {place.rejectionReason}
            </p>
          )}
          <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
            <button
              className="btn"
              type="button"
              onClick={() => onUpdateStatus("APROVADO", "")}
            >
              <LegacyIcon name="check" />
              Aprovar
            </button>
            <input
              type="text"
              placeholder="Motivo caso rejeite..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #cbd5e1", minWidth: 220 }}
            />
            <button
              className="btn line"
              type="button"
              onClick={() => onUpdateStatus("REJEITADO", rejectionReason)}
            >
              <LegacyIcon name="x" />
              Rejeitar
            </button>
            <button className="btn line" type="button" onClick={onManage}>
              <LegacyIcon name="settings" />
              Editar / Fotos
            </button>
            <button className="btn line" type="button" onClick={onRegister}>
              <LegacyIcon name="plus" />
              Criar local
            </button>
            <button className="btn line" type="button" onClick={() => navigate("/admin")}>
              Abrir Painel Admin completo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
