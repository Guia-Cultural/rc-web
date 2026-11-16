import { useState } from "react";
import LegacyIcon from "../../../components/common/LegacyIcon";
import SectionHeader from "./SectionHeader";

function Stars({ value }) {
  return (
    <span className="stars" aria-label={`${value} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <LegacyIcon key={index} name="star" className={index < Math.round(value) ? "on" : ""} />
      ))}
    </span>
  );
}

function ReviewForm({ initialRating, initialText, isEdit, onSubmit }) {
  const [rating, setRating] = useState(initialRating);
  const [text, setText] = useState(initialText);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ assessment: rating, commentary: text.trim() });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="lform" onSubmit={submit}>
      <div className="fld">
        <b className="lbl">Sua nota</b>
        <span className="rate simple">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => setRating(score)}
              aria-pressed={rating === score}
              aria-label={`${score} estrelas`}
            >
              <LegacyIcon name="star" />
            </button>
          ))}
        </span>
      </div>
      <label>
        Comentário
        <textarea
          maxLength={500}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Conte como foi a sua visita"
        />
      </label>
      <button className="btn" type="submit" disabled={submitting}>
        {submitting ? "Salvando..." : isEdit ? "Atualizar avaliação" : "Publicar avaliação"}
      </button>
    </form>
  );
}

export default function ReviewsSection({
  reviews,
  sort,
  onSort,
  user,
  onOpenAuth,
  onSaveReview,
  onDeleteReview,
}) {
  const myExisting = user ? reviews.find((r) => Number(r.userId) === Number(user.id)) : null;

  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + Number(review.assessment || 0), 0) / reviews.length
    : 0;

  return (
    <section className="lsec w" id="avaliacoes">
      <div className="wrap">
        <SectionHeader icon="star" badge="Avaliações">
          O que dizem <em className="hl">os visitantes</em>
        </SectionHeader>
        <div className="l2">
          <div className="rv">
            <div className="lcard t sum">
              <div className="avg">
                <b>{average.toFixed(1).replace(".", ",")}</b>
                <Stars value={average} />
                <small>
                  {reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}
                </small>
              </div>
              <div className="bars">
                {[5, 4, 3, 2, 1].map((score) => {
                  const count = reviews.filter((review) => Math.round(Number(review.assessment)) === score).length;
                  return (
                    <div key={score}>
                      <span>{score}</span>
                      <i>
                        <b style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }} />
                      </i>
                      <small>{count}</small>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="revbar">
              <b>{reviews.length} comentários reais</b>
              <label>
                Ordenar{" "}
                <select value={sort} onChange={(event) => onSort(event.target.value)}>
                  <option value="recentes">Mais recentes</option>
                  <option value="melhor">Melhor nota</option>
                  <option value="pior">Pior nota</option>
                </select>
              </label>
            </div>

            <ul className="revs">
              {reviews.length === 0 && (
                <li className="rev">
                  <div>
                    <p>Este local ainda não possui avaliações. Seja o primeiro a avaliar!</p>
                  </div>
                </li>
              )}
              {reviews.map((review) => {
                const authorName = review.userName || `Usuário #${review.userId}`;
                const canDelete = user && (user.role === "ADMIN" || Number(user.id) === Number(review.userId));
                const formattedDate = review.dateCreate
                  ? new Date(review.dateCreate).toLocaleDateString("pt-BR")
                  : "";
                return (
                  <li className="rev" key={review.id}>
                    <span className="av">{authorName[0]?.toUpperCase() || "U"}</span>
                    <div style={{ flex: 1 }}>
                      <div className="rhd">
                        <b>{authorName}</b>
                        <small>{formattedDate}</small>
                      </div>
                      <Stars value={Number(review.assessment)} />
                      {review.commentary && <p>{review.commentary}</p>}
                      {canDelete && (
                        <button
                          type="button"
                          className="btn ghost xs"
                          style={{ marginTop: 6 }}
                          onClick={() => onDeleteReview(review.id)}
                        >
                          Excluir avaliação
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="lcard rv">
            <h3 className="h-ic">
              <LegacyIcon name="pen" />
              {myExisting ? "Editar sua avaliação" : "Avaliar este local"}
            </h3>
            {!user ? (
              <div className="lock" style={{ flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <LegacyIcon name="lock" />
                  <span>Entre com sua conta para avaliar este local (1 avaliação por usuário).</span>
                </div>
                <button type="button" className="btn" onClick={onOpenAuth}>
                  Entrar para avaliar
                </button>
              </div>
            ) : (
              <ReviewForm
                key={myExisting ? `${myExisting.id}-${myExisting.assessment}-${myExisting.commentary}` : "new"}
                initialRating={myExisting ? Math.round(Number(myExisting.assessment || 5)) : 5}
                initialText={myExisting?.commentary || ""}
                isEdit={Boolean(myExisting)}
                onSubmit={({ assessment, commentary }) =>
                  onSaveReview({ assessment, commentary, existingId: myExisting?.id || null })
                }
              />
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
