import LegacyIcon from "../../../components/common/LegacyIcon";
import { roteiroImage } from "../data/images";

export default function DetailModal({ detail, onClose }) {
  if (!detail) return null;
  const imgSrc = detail.imageUrl || (detail.image ? roteiroImage(detail.image) : "");

  return (
    <dialog
      className="rmd"
      open
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <button className="rmx" type="button" onClick={onClose} aria-label="Fechar">
        <LegacyIcon name="x" />
      </button>
      {imgSrc ? (
        <div className="gal">
          <img src={imgSrc} alt={detail.title} />
        </div>
      ) : null}
      <div className="mb">
        <h3>{detail.title}</h3>
        <p>{detail.description}</p>
        {detail.rows ? (
          <ul>
            {detail.rows.map((row) => (
              <li key={row}>{row}</li>
            ))}
          </ul>
        ) : null}
        <div className="lact">
          {detail.action ? (
            <button
              className="btn"
              type="button"
              onClick={() => {
                detail.action();
                onClose();
              }}
            >
              Escolher esta opção
            </button>
          ) : null}
          <button className="btn ghost" type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </dialog>
  );
}
