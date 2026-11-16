import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { categoriesService } from "../../services/categoriesService";
import { favoritesService } from "../../services/favoritesService";
import { placesService } from "../../services/placesService";
import { tripsService } from "../../services/tripsService";
import "./AuthAccountModal.css";

const INSTITUTIONAL_CONTENT = {
  contato: {
    title: "Fale com o Rota Cultural",
    subtitle: "Canal direto para sugestões, correções de locais ou parcerias culturais.",
    body: "Envie uma mensagem abaixo ou entre em contato com a equipe do projeto pelo repositório oficial Guia-Cultural.",
    isContact: true,
  },
  faq: {
    title: "Perguntas Frequentes",
    subtitle: "Dúvidas comuns sobre contas, locais culturais e roteiros.",
    items: [
      {
        q: "Como funciona o perfil Nativo?",
        a: "Qualquer pessoa pode solicitar o perfil Nativo no cadastro. Por segurança, a conta inicia como Usuário e um administrador aprova o acesso para submissão de locais.",
      },
      {
        q: "Por que um local cadastrado não aparece imediatamente na busca pública?",
        a: "Todo local submetido por um Nativo passa pelo status EM_AVALIACAO até ser aprovado por um administrador.",
      },
      {
        q: "Como o sistema gera os roteiros?",
        a: "Os roteiros são calculados de forma determinística usando apenas locais reais aprovados no banco de dados, respeitando destino, período (até 30 dias), orçamento e preferências.",
      },
    ],
  },
  ajuda: {
    title: "Central de Ajuda",
    subtitle: "Orientações rápidas para aproveitar a plataforma.",
    items: [
      {
        q: "Explorar locais",
        a: "Use a página Explorar para filtrar atrações culturais aprovadas por cidade, categoria e faixa de preço.",
      },
      {
        q: "Criar roteiro personalizado",
        a: "Entre com sua conta, acesse Roteiros, escolha destino, datas, orçamento e atrações para salvar seu itinerário.",
      },
    ],
  },
  termos: {
    title: "Termos de Uso",
    subtitle: "Diretrizes de utilização do Rota Cultural.",
    items: [
      {
        q: "Autenticidade das informações",
        a: "Os colaboradores comprometem-se a cadastrar informações verdadeiras de endereço, horários e faixas de preço.",
      },
      {
        q: "Privacidade e segurança",
        a: "Senhas são armazenadas com hash BCrypt e cada usuário só acessa e gerencia seus próprios dados, viagens e favoritos.",
      },
    ],
  },
};

export default function AuthAccountModal() {
  const { modalAberto, openModal, closeModal } = useModal();
  const { user, login, register, logout, updateProfile } = useAuth();
  if (!modalAberto) return null;
  return (
    <AuthAccountModalContent
      key={`${modalAberto}-${user?.id || "anon"}`}
      modalAberto={modalAberto}
      openModal={openModal}
      closeModal={closeModal}
      user={user}
      login={login}
      register={register}
      logout={logout}
      updateProfile={updateProfile}
    />
  );
}

function AuthAccountModalContent({
  modalAberto,
  openModal,
  closeModal,
  user,
  login,
  register,
  logout,
  updateProfile,
}) {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCep, setRegCep] = useState("");
  const [regBio, setRegBio] = useState("");
  const [regNative, setRegNative] = useState(false);

  // Account tabs
  const [tab, setTab] = useState("dados");
  const [profileForm, setProfileForm] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    cep: user?.cep || "",
    bio: user?.bio || "",
  }));
  const [favorites, setFavorites] = useState([]);
  const [trips, setTrips] = useState([]);
  const [myPlaces, setMyPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accountLoading, setAccountLoading] = useState(false);

  // New place quick form for NATIVO/ADMIN
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [pendingPlaceId, setPendingPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState({
    name: "",
    description: "",
    catId: "",
    address: "",
    city: "",
    state: "",
    country: "Brasil",
    latitude: "",
    longitude: "",
    businessHours: "",
    price: "GRATUITO",
    estimatedCost: "",
    officialWebsite: "",
    contact: "",
  });
  const [placeFiles, setPlaceFiles] = useState([]);

  // Contact form
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    if (modalAberto !== "conta" || !user) return undefined;

    let active = true;
    const timer = window.setTimeout(async () => {
      if (!active) return;
      if (tab === "dados") return;
      setAccountLoading(true);
      setError("");
      try {
        if (tab === "favoritos") {
          const data = await favoritesService.getMyFavorites();
          if (active) setFavorites(Array.isArray(data) ? data : []);
        } else if (tab === "viagens") {
          const data = await tripsService.getMyTrips();
          if (active) setTrips(Array.isArray(data) ? data : []);
        } else if (tab === "locais" && (user.role === "NATIVO" || user.role === "ADMIN")) {
          const [placesData, catsData] = await Promise.all([
            placesService.getMyPlaces(),
            categoriesService.getAll(),
          ]);
          if (!active) return;
          setMyPlaces(Array.isArray(placesData) ? placesData : []);
          const safeCats = Array.isArray(catsData) ? catsData : [];
          setCategories(safeCats);
          if (safeCats.length) {
            setNewPlace((prev) => (prev.catId ? prev : { ...prev, catId: String(safeCats[0].id) }));
          }
        }
      } catch (err) {
        if (active) setError(err.message || "Erro ao carregar dados da conta.");
      } finally {
        if (active) setAccountLoading(false);
      }
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [modalAberto, tab, user]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(loginEmail, loginPassword);
      setLoginPassword("");
      closeModal();
    } catch (err) {
      setError(err.message || "Não foi possível entrar.");
    } finally {
      setBusy(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        cep: regCep,
        bio: regBio,
        requestNative: regNative,
      });
      setRegPassword("");
      closeModal();
    } catch (err) {
      setError(err.message || "Não foi possível concluir o cadastro.");
    } finally {
      setBusy(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setBusy(true);
    try {
      await updateProfile(profileForm);
      setSuccess("Dados da conta atualizados com sucesso.");
    } catch (err) {
      setError(err.message || "Erro ao atualizar dados.");
    } finally {
      setBusy(false);
    }
  };

  const handleRemoveFavorite = async (locId) => {
    try {
      await favoritesService.removeByPlace(locId);
      setFavorites((prev) => prev.filter((item) => item.locId !== locId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await tripsService.remove(tripId);
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreatePlace = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setBusy(true);
    try {
      let placeId = pendingPlaceId;
      let createdStatus = "EM_AVALIACAO";
      if (!placeId) {
        const payload = {
          ...newPlace,
          catId: Number(newPlace.catId),
          estimatedCost: newPlace.estimatedCost !== "" ? Number(newPlace.estimatedCost) : null,
          latitude: newPlace.latitude !== "" ? Number(newPlace.latitude) : null,
          longitude: newPlace.longitude !== "" ? Number(newPlace.longitude) : null,
        };
        const created = await placesService.create(payload);
        placeId = created?.id || null;
        createdStatus = created?.status || "EM_AVALIACAO";
        setPendingPlaceId(placeId);
      }

      if (placeFiles.length > 0 && placeId) {
        try {
          await placesService.uploadImages(placeId, placeFiles, true);
        } catch (uploadErr) {
          const updatedList = await placesService.getMyPlaces().catch(() => []);
          if (Array.isArray(updatedList)) {
            setMyPlaces(updatedList);
          }
          throw new Error(
            `Local #${placeId} já foi salvo (${createdStatus}), mas o envio das fotos falhou: ${uploadErr.message}. Ajuste os arquivos e clique em "Reenviar fotos" sem duplicar o cadastro.`,
            { cause: uploadErr }
          );
        }
      }

      const updatedList = await placesService.getMyPlaces();
      setMyPlaces(Array.isArray(updatedList) ? updatedList : []);
      setPendingPlaceId(null);
      setShowPlaceForm(false);
      setPlaceFiles([]);
      setNewPlace((prev) => ({
        ...prev,
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        businessHours: "",
        estimatedCost: "",
        officialWebsite: "",
        contact: "",
      }));
      setSuccess(
        createdStatus === "APROVADO"
          ? "Local cadastrado e aprovado."
          : "Local enviado para avaliação do administrador (EM_AVALIACAO)."
      );
    } catch (err) {
      setError(err.message || "Erro ao cadastrar local.");
    } finally {
      setBusy(false);
    }
  };

  const fillDemo = (email) => {
    setLoginEmail(email);
    setLoginPassword("Senha@123");
    setError("");
  };

  const institutional = INSTITUTIONAL_CONTENT[modalAberto];

  return (
    <div
      className="rc-modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className={`rc-modal ${modalAberto === "conta" ? "rc-modal--wide" : ""}`}>
        <button type="button" className="rc-modal__close" onClick={closeModal} aria-label="Fechar modal">
          ×
        </button>

        {modalAberto === "entrar" && (
          <>
            <h2 className="rc-modal__title">Entrar no Rota Cultural</h2>
            <p className="rc-modal__subtitle">
              Acesse sua conta para favoritar locais, avaliar experiências e salvar seus roteiros.
            </p>
            {error && <div className="rc-modal__alert rc-modal__alert--error">{error}</div>}
            <form className="rc-modal__form" onSubmit={handleLoginSubmit}>
              <label className="rc-modal__field">
                E-mail
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </label>
              <label className="rc-modal__field">
                Senha
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Sua senha"
                />
              </label>
              <button type="submit" className="rc-modal__btn" disabled={busy}>
                {busy ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="rc-modal__demos">
              <p className="rc-modal__demos-title">Contas de teste do ambiente local (senha: Senha@123):</p>
              <div className="rc-modal__demos-list">
                <button
                  type="button"
                  className="rc-modal__btn rc-modal__btn--ghost rc-modal__btn--sm"
                  onClick={() => fillDemo("usuario@rotacultural.com")}
                >
                  Usuário
                </button>
                <button
                  type="button"
                  className="rc-modal__btn rc-modal__btn--ghost rc-modal__btn--sm"
                  onClick={() => fillDemo("nativo@rotacultural.com")}
                >
                  Nativo
                </button>
                <button
                  type="button"
                  className="rc-modal__btn rc-modal__btn--ghost rc-modal__btn--sm"
                  onClick={() => fillDemo("admin@rotacultural.com")}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="rc-modal__switch">
              Ainda não tem conta?{" "}
              <button type="button" onClick={() => openModal("cadastrar")}>
                Criar conta
              </button>
            </div>
          </>
        )}

        {modalAberto === "cadastrar" && (
          <>
            <h2 className="rc-modal__title">Criar conta</h2>
            <p className="rc-modal__subtitle">
              Cadastre-se gratuitamente para planejar viagens e personalizar seus roteiros culturais.
            </p>
            {error && <div className="rc-modal__alert rc-modal__alert--error">{error}</div>}
            <form className="rc-modal__form" onSubmit={handleRegisterSubmit}>
              <label className="rc-modal__field">
                Nome completo
                <input
                  type="text"
                  required
                  maxLength={150}
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ex.: Mariana Oliveira"
                />
              </label>
              <div className="rc-modal__row">
                <label className="rc-modal__field">
                  E-mail
                  <input
                    type="email"
                    required
                    maxLength={150}
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="mariana@email.com"
                  />
                </label>
                <label className="rc-modal__field">
                  CEP (opcional)
                  <input
                    type="text"
                    maxLength={11}
                    value={regCep}
                    onChange={(e) => setRegCep(e.target.value)}
                    placeholder="01310-100"
                  />
                </label>
              </div>
              <label className="rc-modal__field">
                Senha (mínimo 8 caracteres)
                <input
                  type="password"
                  required
                  minLength={8}
                  maxLength={100}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Crie uma senha segura"
                />
              </label>
              <label className="rc-modal__field">
                Sobre você (opcional)
                <textarea
                  rows={2}
                  maxLength={500}
                  value={regBio}
                  onChange={(e) => setRegBio(e.target.value)}
                  placeholder="Seus interesses culturais..."
                />
              </label>
              <label className="rc-modal__checkbox">
                <input
                  type="checkbox"
                  checked={regNative}
                  onChange={(e) => setRegNative(e.target.checked)}
                />
                <span>
                  <strong>Solicitar perfil Nativo / Produtor Cultural</strong>
                  <br />
                  Permite cadastrar locais após aprovação. Por segurança, sua conta inicia como{" "}
                  <code>USUARIO</code> até a validação por um administrador.
                </span>
              </label>
              <button type="submit" className="rc-modal__btn" disabled={busy}>
                {busy ? "Cadastrando..." : "Concluir cadastro"}
              </button>
            </form>
            <div className="rc-modal__switch">
              Já possui cadastro?{" "}
              <button type="button" onClick={() => openModal("entrar")}>
                Entrar
              </button>
            </div>
          </>
        )}

        {modalAberto === "conta" && user && (
          <>
            <div className="rc-account__header">
              <div>
                <h2 className="rc-modal__title" style={{ marginBottom: 4 }}>
                  {user.name}
                  <span className="rc-account__badge">{user.role}</span>
                </h2>
                <p className="rc-modal__subtitle" style={{ marginBottom: 0 }}>
                  {user.email}
                </p>
              </div>
              <div className="rc-account__card-actions">
                {user.role === "ADMIN" && (
                  <button
                    type="button"
                    className="rc-modal__btn rc-modal__btn--secondary rc-modal__btn--sm"
                    onClick={() => {
                      closeModal();
                      navigate("/admin");
                    }}
                  >
                    Painel Admin
                  </button>
                )}
                <button
                  type="button"
                  className="rc-modal__btn rc-modal__btn--danger rc-modal__btn--sm"
                  onClick={() => {
                    logout();
                    closeModal();
                  }}
                >
                  Sair
                </button>
              </div>
            </div>

            {user.nativeRequested && user.role === "USUARIO" && (
              <div className="rc-modal__alert rc-modal__alert--info">
                Sua solicitação para o perfil <strong>NATIVO</strong> está aguardando aprovação de um administrador.
              </div>
            )}

            <div className="rc-account__tabs">
              <button
                type="button"
                className={`rc-account__tab ${tab === "dados" ? "rc-account__tab--active" : ""}`}
                onClick={() => setTab("dados")}
              >
                Meus dados
              </button>
              <button
                type="button"
                className={`rc-account__tab ${tab === "favoritos" ? "rc-account__tab--active" : ""}`}
                onClick={() => setTab("favoritos")}
              >
                Favoritos
              </button>
              <button
                type="button"
                className={`rc-account__tab ${tab === "viagens" ? "rc-account__tab--active" : ""}`}
                onClick={() => setTab("viagens")}
              >
                Minhas viagens
              </button>
              {(user.role === "NATIVO" || user.role === "ADMIN") && (
                <button
                  type="button"
                  className={`rc-account__tab ${tab === "locais" ? "rc-account__tab--active" : ""}`}
                  onClick={() => setTab("locais")}
                >
                  Meus locais
                </button>
              )}
            </div>

            {error && <div className="rc-modal__alert rc-modal__alert--error">{error}</div>}
            {success && <div className="rc-modal__alert rc-modal__alert--success">{success}</div>}

            {tab === "dados" && (
              <form className="rc-modal__form" onSubmit={handleProfileSave}>
                <label className="rc-modal__field">
                  Nome
                  <input
                    type="text"
                    required
                    maxLength={150}
                    value={profileForm.name}
                    onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                  />
                </label>
                <div className="rc-modal__row">
                  <label className="rc-modal__field">
                    E-mail
                    <input
                      type="email"
                      required
                      maxLength={150}
                      value={profileForm.email}
                      onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </label>
                  <label className="rc-modal__field">
                    CEP
                    <input
                      type="text"
                      maxLength={11}
                      value={profileForm.cep}
                      onChange={(e) => setProfileForm((p) => ({ ...p, cep: e.target.value }))}
                    />
                  </label>
                </div>
                <label className="rc-modal__field">
                  Bio
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm((p) => ({ ...p, bio: e.target.value }))}
                  />
                </label>
                <div>
                  <button type="submit" className="rc-modal__btn" disabled={busy}>
                    {busy ? "Salvando..." : "Salvar alterações"}
                  </button>
                </div>
              </form>
            )}

            {tab === "favoritos" && (
              <div className="rc-account__list">
                {accountLoading && <p>Carregando favoritos...</p>}
                {!accountLoading && favorites.length === 0 && (
                  <p className="rc-modal__subtitle">Você ainda não favoritou nenhum local cultural.</p>
                )}
                {favorites.map((fav) => (
                  <div className="rc-account__card" key={fav.locId}>
                    <div>
                      <h4>{fav.placeName}</h4>
                      <p>
                        {fav.placeCity} - {fav.placeState} • {fav.categoryName || "Cultural"}
                      </p>
                    </div>
                    <div className="rc-account__card-actions">
                      <button
                        type="button"
                        className="rc-modal__btn rc-modal__btn--secondary rc-modal__btn--sm"
                        onClick={() => {
                          closeModal();
                          navigate(`/local/${fav.locId}`);
                        }}
                      >
                        Abrir local
                      </button>
                      <button
                        type="button"
                        className="rc-modal__btn rc-modal__btn--danger rc-modal__btn--sm"
                        onClick={() => handleRemoveFavorite(fav.locId)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "viagens" && (
              <div className="rc-account__list">
                {accountLoading && <p>Carregando viagens...</p>}
                {!accountLoading && trips.length === 0 && (
                  <p className="rc-modal__subtitle">
                    Nenhuma viagem salva ainda. Acesse Roteiros para planejar sua viagem!
                  </p>
                )}
                {trips.map((trip) => (
                  <div className="rc-account__card" key={trip.id}>
                    <div>
                      <h4>{trip.destination}</h4>
                      <p>
                        {trip.startDate} até {trip.endDate} • Orçamento: R$ {Number(trip.budget || 0).toFixed(2)} •{" "}
                        {trip.itineraryCount || 0} paradas no roteiro
                      </p>
                    </div>
                    <div className="rc-account__card-actions">
                      <button
                        type="button"
                        className="rc-modal__btn rc-modal__btn--secondary rc-modal__btn--sm"
                        onClick={() => {
                          closeModal();
                          navigate(`/roteiros?tripId=${trip.id}`);
                        }}
                      >
                        Ver roteiro
                      </button>
                      <button
                        type="button"
                        className="rc-modal__btn rc-modal__btn--danger rc-modal__btn--sm"
                        onClick={() => handleDeleteTrip(trip.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "locais" && (
              <div>
                <div style={{ marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p className="rc-modal__subtitle" style={{ margin: 0 }}>
                    Acompanhe a aprovação dos locais que você enviou.
                  </p>
                  <button
                    type="button"
                    className="rc-modal__btn rc-modal__btn--sm"
                    onClick={() => {
                      setPendingPlaceId(null);
                      setShowPlaceForm((v) => !v);
                    }}
                  >
                    {showPlaceForm ? "Voltar à lista" : "+ Cadastrar local"}
                  </button>
                </div>

                {showPlaceForm ? (
                  <form className="rc-modal__form" onSubmit={handleCreatePlace}>
                    <div className="rc-modal__row">
                      <label className="rc-modal__field">
                        Nome do local
                        <input
                          required
                          maxLength={150}
                          value={newPlace.name}
                          onChange={(e) => setNewPlace((p) => ({ ...p, name: e.target.value }))}
                        />
                      </label>
                      <label className="rc-modal__field">
                        Categoria
                        <select
                          required
                          value={newPlace.catId}
                          onChange={(e) => setNewPlace((p) => ({ ...p, catId: e.target.value }))}
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <label className="rc-modal__field">
                      Descrição
                      <textarea
                        required
                        rows={2}
                        maxLength={500}
                        value={newPlace.description}
                        onChange={(e) => setNewPlace((p) => ({ ...p, description: e.target.value }))}
                      />
                    </label>
                    <label className="rc-modal__field">
                      Endereço
                      <input
                        required
                        maxLength={150}
                        value={newPlace.address}
                        onChange={(e) => setNewPlace((p) => ({ ...p, address: e.target.value }))}
                      />
                    </label>
                    <div className="rc-modal__row">
                      <label className="rc-modal__field">
                        Cidade
                        <input
                          required
                          maxLength={100}
                          value={newPlace.city}
                          onChange={(e) => setNewPlace((p) => ({ ...p, city: e.target.value }))}
                        />
                      </label>
                      <label className="rc-modal__field">
                        Estado (UF)
                        <input
                          required
                          maxLength={150}
                          placeholder="SP"
                          value={newPlace.state}
                          onChange={(e) => setNewPlace((p) => ({ ...p, state: e.target.value }))}
                        />
                      </label>
                    </div>
                    <div className="rc-modal__row">
                      <label className="rc-modal__field">
                        Horário de funcionamento
                        <input
                          required
                          maxLength={150}
                          placeholder="Ter a Dom: 09h às 17h"
                          value={newPlace.businessHours}
                          onChange={(e) => setNewPlace((p) => ({ ...p, businessHours: e.target.value }))}
                        />
                      </label>
                      <label className="rc-modal__field">
                        Faixa de preço
                        <select
                          value={newPlace.price}
                          onChange={(e) => setNewPlace((p) => ({ ...p, price: e.target.value }))}
                        >
                          <option value="GRATUITO">Gratuito</option>
                          <option value="BARATO">Barato</option>
                          <option value="MODERADO">Moderado</option>
                          <option value="CARO">Caro</option>
                        </select>
                      </label>
                    </div>
                    <div className="rc-modal__row">
                      <label className="rc-modal__field">
                        Custo estimado (opcional, R$)
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newPlace.estimatedCost}
                          onChange={(e) => setNewPlace((p) => ({ ...p, estimatedCost: e.target.value }))}
                        />
                      </label>
                      <label className="rc-modal__field">
                        Contato (opcional)
                        <input
                          type="text"
                          maxLength={150}
                          placeholder="(11) 99999-9999 ou e-mail"
                          value={newPlace.contact}
                          onChange={(e) => setNewPlace((p) => ({ ...p, contact: e.target.value }))}
                        />
                      </label>
                    </div>
                    <div className="rc-modal__row">
                      <label className="rc-modal__field">
                        Latitude (opcional)
                        <input
                          type="number"
                          step="any"
                          placeholder="-23.55052"
                          value={newPlace.latitude}
                          onChange={(e) => setNewPlace((p) => ({ ...p, latitude: e.target.value }))}
                        />
                      </label>
                      <label className="rc-modal__field">
                        Longitude (opcional)
                        <input
                          type="number"
                          step="any"
                          placeholder="-46.63331"
                          value={newPlace.longitude}
                          onChange={(e) => setNewPlace((p) => ({ ...p, longitude: e.target.value }))}
                        />
                      </label>
                    </div>
                    <label className="rc-modal__field">
                      Site oficial (opcional)
                      <input
                        type="url"
                        placeholder="https://"
                        value={newPlace.officialWebsite}
                        onChange={(e) => setNewPlace((p) => ({ ...p, officialWebsite: e.target.value }))}
                      />
                    </label>
                    <label className="rc-modal__field">
                      Imagens do local (JPG, PNG ou WEBP — máx. 5MB cada)
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={(e) => setPlaceFiles(Array.from(e.target.files || []))}
                      />
                    </label>
                    <div>
                      <button type="submit" className="rc-modal__btn" disabled={busy}>
                        {busy ? "Enviando..." : pendingPlaceId ? "Reenviar fotos" : "Submeter local"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="rc-account__list">
                    {accountLoading && <p>Carregando seus locais...</p>}
                    {!accountLoading && myPlaces.length === 0 && (
                      <p className="rc-modal__subtitle">Você ainda não cadastrou nenhum local.</p>
                    )}
                    {myPlaces.map((pl) => (
                      <div className="rc-account__card" key={pl.id}>
                        <div>
                          <h4>
                            {pl.name}{" "}
                            <span className={`rc-status-pill rc-status-pill--${pl.status}`}>{pl.status}</span>
                          </h4>
                          <p>
                            {pl.city} - {pl.state}
                            {pl.rejectionReason ? ` • Motivo: ${pl.rejectionReason}` : ""}
                          </p>
                        </div>
                        <div className="rc-account__card-actions">
                          <button
                            type="button"
                            className="rc-modal__btn rc-modal__btn--secondary rc-modal__btn--sm"
                            onClick={() => {
                              closeModal();
                              navigate(`/local/${pl.id}`);
                            }}
                          >
                            Visualizar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {institutional && (
          <>
            <h2 className="rc-modal__title">{institutional.title}</h2>
            <p className="rc-modal__subtitle">{institutional.subtitle}</p>
            {institutional.isContact ? (
              contactSent ? (
                <div className="rc-modal__alert rc-modal__alert--success">
                  Mensagem registrada! Nossa equipe retornará em breve.
                </div>
              ) : (
                <form
                  className="rc-modal__form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSent(true);
                  }}
                >
                  <label className="rc-modal__field">
                    Seu nome
                    <input type="text" required defaultValue={user?.name || ""} />
                  </label>
                  <label className="rc-modal__field">
                    E-mail
                    <input type="email" required defaultValue={user?.email || ""} />
                  </label>
                  <label className="rc-modal__field">
                    Mensagem
                    <textarea rows={3} required placeholder="Como podemos ajudar?" />
                  </label>
                  <button type="submit" className="rc-modal__btn">
                    Enviar mensagem
                  </button>
                </form>
              )
            ) : (
              <div className="rc-account__list">
                {institutional.items.map((item) => (
                  <div className="rc-account__card" key={item.q} style={{ display: "block" }}>
                    <h4>{item.q}</h4>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
