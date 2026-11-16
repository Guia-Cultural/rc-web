import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { categoriesService } from "../../services/categoriesService";
import { placesService } from "../../services/placesService";
import { usersService } from "../../services/usersService";
import "./AdminPage.css";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { openModal } = useModal();
  const navigate = useNavigate();

  const [tab, setTab] = useState("locais");
  const [statusFilter, setStatusFilter] = useState("EM_AVALIACAO");
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [rejectDrafts, setRejectDrafts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const isAdmin = user?.role === "ADMIN";

  const loadData = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    setError("");
    try {
      if (tab === "locais") {
        const data = await placesService.getAdminPlaces(statusFilter || undefined);
        setPlaces(Array.isArray(data) ? data : []);
      } else if (tab === "categorias") {
        const data = await categoriesService.getAll();
        setCategories(Array.isArray(data) ? data : []);
      } else if (tab === "usuarios") {
        const data = await usersService.getAll();
        setUsers(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setError(err.message || "Erro ao carregar dados administrativos.");
    } finally {
      setLoading(false);
    }
  }, [isAdmin, statusFilter, tab]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadData();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadData]);

  if (authLoading) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-panel">Verificando permissões...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-panel">
            <h2>Acesso restrito a administradores</h2>
            <p>Faça login com uma conta ADMIN para moderar locais, categorias e usuários.</p>
            <button type="button" className="admin-btn admin-btn--secondary" onClick={() => openModal("entrar")}>
              Entrar na conta
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-panel">
            <h2>Permissão insuficiente</h2>
            <p>Seu perfil atual ({user.role}) não possui acesso administrativo.</p>
            <button type="button" className="admin-btn admin-btn--secondary" onClick={() => navigate("/")}>
              Voltar para a Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusChange = async (placeId, nextStatus) => {
    setError("");
    setFeedback("");
    try {
      const reason = nextStatus === "REJEITADO" ? rejectDrafts[placeId] || "" : null;
      await placesService.updateStatus(placeId, nextStatus, reason);
      setFeedback(`Status do local #${placeId} atualizado para ${nextStatus}.`);
      await loadData();
    } catch (err) {
      setError(err.message || "Erro ao atualizar status do local.");
    }
  };

  const handleDeletePlace = async (placeId) => {
    setError("");
    setFeedback("");
    try {
      await placesService.remove(placeId);
      setFeedback(`Local #${placeId} removido.`);
      await loadData();
    } catch (err) {
      setError(err.message || "Erro ao excluir local.");
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setError("");
    setFeedback("");
    try {
      await categoriesService.create({ name: newCategoryName.trim() });
      setNewCategoryName("");
      setFeedback("Categoria criada com sucesso.");
      await loadData();
    } catch (err) {
      setError(err.message || "Erro ao criar categoria.");
    }
  };

  const handleDeleteCategory = async (catId) => {
    setError("");
    setFeedback("");
    try {
      await categoriesService.remove(catId);
      setFeedback("Categoria removida.");
      await loadData();
    } catch (err) {
      setError(err.message || "Erro ao remover categoria.");
    }
  };

  const handleRoleUpdate = async (userId, nextRole) => {
    setError("");
    setFeedback("");
    try {
      await usersService.updateRole(userId, nextRole);
      setFeedback(`Perfil do usuário #${userId} atualizado para ${nextRole}.`);
      await loadData();
    } catch (err) {
      setError(err.message || "Erro ao alterar role do usuário.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>Painel Administrativo</h1>
            <p>Aprovação de locais culturais, gerenciamento de categorias e aprovação de perfis Nativo.</p>
          </div>
          <button type="button" className="admin-btn admin-btn--secondary" onClick={loadData}>
            Atualizar dados
          </button>
        </div>

        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab ${tab === "locais" ? "admin-tab--active" : ""}`}
            onClick={() => setTab("locais")}
          >
            Moderação de Locais
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === "categorias" ? "admin-tab--active" : ""}`}
            onClick={() => setTab("categorias")}
          >
            Categorias
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === "usuarios" ? "admin-tab--active" : ""}`}
            onClick={() => setTab("usuarios")}
          >
            Usuários e Nativos
          </button>
        </div>

        {error && <div className="admin-alert admin-alert--error">{error}</div>}
        {feedback && <div className="admin-alert admin-alert--success">{feedback}</div>}

        <div className="admin-panel">
          {tab === "locais" && (
            <>
              <div className="admin-filters">
                {[
                  { label: "Em avaliação", value: "EM_AVALIACAO" },
                  { label: "Aprovados", value: "APROVADO" },
                  { label: "Rejeitados", value: "REJEITADO" },
                  { label: "Todos", value: "" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    className={`admin-tab ${statusFilter === opt.value ? "admin-tab--active" : ""}`}
                    onClick={() => setStatusFilter(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {loading && <p>Carregando locais...</p>}
              {!loading && places.length === 0 && <p>Nenhum local encontrado para este filtro.</p>}

              <div className="admin-list">
                {places.map((pl) => (
                  <div className="admin-item" key={pl.id}>
                    <div className="admin-item__info" style={{ flex: "1 1 420px" }}>
                      <h3>
                        #{pl.id} — {pl.name}{" "}
                        <span className={`rc-status-pill rc-status-pill--${pl.status}`}>{pl.status}</span>
                      </h3>
                      <p>
                        {pl.city} - {pl.state} • Categoria: {pl.categoryName || "Sem categoria"} • Criado por:{" "}
                        {pl.creatorName}
                      </p>
                      <p>{pl.description}</p>
                      {pl.rejectionReason && (
                        <p style={{ color: "#b91c1c" }}>Motivo atual: {pl.rejectionReason}</p>
                      )}
                    </div>

                    <div className="admin-item__actions" style={{ flexDirection: "column", alignItems: "flex-end" }}>
                      <div className="admin-item__actions">
                        <button
                          type="button"
                          className="admin-btn admin-btn--secondary"
                          onClick={() => navigate(`/local/${pl.id}`)}
                        >
                          Visualizar
                        </button>
                        {pl.status !== "APROVADO" && (
                          <button
                            type="button"
                            className="admin-btn admin-btn--approve"
                            onClick={() => handleStatusChange(pl.id, "APROVADO")}
                          >
                            Aprovar
                          </button>
                        )}
                        <button
                          type="button"
                          className="admin-btn admin-btn--danger"
                          onClick={() => handleDeletePlace(pl.id)}
                        >
                          Excluir
                        </button>
                      </div>

                      {pl.status !== "REJEITADO" && (
                        <div className="admin-item__actions">
                          <input
                            type="text"
                            className="admin-select"
                            placeholder="Motivo da rejeição (opcional)"
                            value={rejectDrafts[pl.id] || ""}
                            onChange={(e) =>
                              setRejectDrafts((prev) => ({ ...prev, [pl.id]: e.target.value }))
                            }
                          />
                          <button
                            type="button"
                            className="admin-btn admin-btn--reject"
                            onClick={() => handleStatusChange(pl.id, "REJEITADO")}
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "categorias" && (
            <>
              <form className="admin-form-inline" onSubmit={handleCreateCategory}>
                <input
                  type="text"
                  required
                  maxLength={75}
                  placeholder="Nova categoria cultural..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button type="submit" className="admin-btn admin-btn--approve">
                  + Adicionar categoria
                </button>
              </form>

              <div className="admin-list">
                {categories.map((cat) => (
                  <div className="admin-item" key={cat.id}>
                    <div className="admin-item__info">
                      <h3>
                        #{cat.id} — {cat.name}
                      </h3>
                    </div>
                    <div className="admin-item__actions">
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleDeleteCategory(cat.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "usuarios" && (
            <div className="admin-list">
              {loading && <p>Carregando usuários...</p>}
              {users.map((u) => (
                <div className="admin-item" key={u.id}>
                  <div className="admin-item__info">
                    <h3>
                      #{u.id} — {u.name}{" "}
                      {u.nativeRequested && u.role === "USUARIO" && (
                        <span className="rc-status-pill rc-status-pill--EM_AVALIACAO">
                          Solicitou NATIVO
                        </span>
                      )}
                    </h3>
                    <p>
                      {u.email} • Perfil atual: <strong>{u.role}</strong>
                    </p>
                  </div>
                  <div className="admin-item__actions">
                    <select
                      className="admin-select"
                      value={u.role}
                      disabled={u.id === user.id}
                      onChange={(e) => handleRoleUpdate(u.id, e.target.value)}
                    >
                      <option value="USUARIO">USUARIO</option>
                      <option value="NATIVO">NATIVO</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    {u.nativeRequested && u.role === "USUARIO" && (
                      <button
                        type="button"
                        className="admin-btn admin-btn--approve"
                        onClick={() => handleRoleUpdate(u.id, "NATIVO")}
                      >
                        Aprovar Nativo
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
