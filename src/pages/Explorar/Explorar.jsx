import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { HOME_IMAGES } from "../../features/Visit/data/homeData";
import { resolveAssetUrl } from "../../services/apiClient";
import { categoriesService } from "../../services/categoriesService";
import { favoritesService } from "../../services/favoritesService";
import { placesService } from "../../services/placesService";
import "./Explorar.css";

const PRICE_LABELS = {
  GRATUITO: "Gratuito",
  BARATO: "Econômico",
  MODERADO: "Moderado",
  CARO: "Confortável",
};

function getFallbackImage(categoryName = "") {
  const norm = categoryName.toLowerCase();
  if (norm.includes("praia")) return HOME_IMAGES["card-praias"];
  if (norm.includes("natureza") || norm.includes("eco")) return HOME_IMAGES["hero-natureza"];
  if (norm.includes("avent")) return HOME_IMAGES["card-aventura"];
  if (norm.includes("urb") || norm.includes("gastr")) return HOME_IMAGES["card-cidades"];
  return HOME_IMAGES["card-historico"];
}

export default function Explorar() {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const activeFavoriteIds = isAuthenticated ? favoriteIds : [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    q: "",
    catId: "",
    city: "",
    price: "",
  });

  useEffect(() => {
    categoriesService
      .getAll()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await placesService.getPublicPlaces({
        q: filters.q || undefined,
        catId: filters.catId || undefined,
        city: filters.city || undefined,
        price: filters.price || undefined,
      });
      setPlaces(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Não foi possível carregar os locais culturais.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = window.setTimeout(fetchPlaces, 200);
    return () => window.clearTimeout(timer);
  }, [fetchPlaces]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    favoritesService
      .getMyFavorites()
      .then((favs) => setFavoriteIds(Array.isArray(favs) ? favs.map((f) => f.locId) : []))
      .catch(() => setFavoriteIds([]));
  }, [isAuthenticated]);

  const handleToggleFavorite = async (placeId) => {
    if (!isAuthenticated) {
      openModal("entrar");
      return;
    }
    try {
      if (favoriteIds.includes(placeId)) {
        await favoritesService.removeByPlace(placeId);
        setFavoriteIds((prev) => prev.filter((id) => id !== placeId));
      } else {
        await favoritesService.add(placeId);
        setFavoriteIds((prev) => [...prev, placeId]);
      }
    } catch (err) {
      setError(err.message || "Não foi possível atualizar favoritos.");
    }
  };

  const clearFilters = () => setFilters({ q: "", catId: "", city: "", price: "" });

  return (
    <div className="explorar-page">
      <section className="explorar-hero">
        <div className="explorar-hero__inner">
          <span className="explorar-hero__badge">Catálogo Cultural Verificado</span>
          <h1 className="explorar-hero__title">
            Explorar <span>locais culturais</span>
          </h1>
          <p className="explorar-hero__subtitle">
            Descubra museus, parques, patrimônios históricos e atrações reais aprovadas pela equipe Rota Cultural.
          </p>
        </div>
      </section>

      <div className="explorar-container">
        <div className="explorar-filters">
          <input
            type="search"
            placeholder="Buscar por nome, descrição ou endereço..."
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            aria-label="Buscar local"
          />

          <select
            value={filters.catId}
            onChange={(e) => setFilters((f) => ({ ...f, catId: e.target.value }))}
            aria-label="Filtrar por categoria"
          >
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Cidade (ex.: São Paulo)"
            value={filters.city}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
            aria-label="Filtrar por cidade"
          />

          <select
            value={filters.price}
            onChange={(e) => setFilters((f) => ({ ...f, price: e.target.value }))}
            aria-label="Filtrar por faixa de preço"
          >
            <option value="">Qualquer faixa</option>
            <option value="GRATUITO">Gratuito</option>
            <option value="BARATO">Barato / Econômico</option>
            <option value="MODERADO">Moderado</option>
            <option value="CARO">Confortável / Caro</option>
          </select>

          <button type="button" className="explorar-filters__clear" onClick={clearFilters}>
            Limpar
          </button>
        </div>

        <div className="explorar-meta">
          <span>
            {loading
              ? "Buscando locais..."
              : `${places.length} ${places.length === 1 ? "local aprovado encontrado" : "locais aprovados encontrados"}`}
          </span>
          <button
            type="button"
            className="explorar-card__btn"
            onClick={() => navigate("/roteiros")}
          >
            Planejar roteiro com estes locais
          </button>
        </div>

        {loading && (
          <div className="explorar-state">
            <h3>Carregando catálogo...</h3>
            <p>Aguarde enquanto consultamos os locais culturais aprovados no servidor.</p>
          </div>
        )}

        {!loading && error && (
          <div className="explorar-state">
            <h3>Erro ao carregar locais</h3>
            <p>{error}</p>
            <button type="button" className="explorar-card__btn" onClick={fetchPlaces}>
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && places.length === 0 && (
          <div className="explorar-state">
            <h3>Nenhum local encontrado</h3>
            <p>Não encontramos locais aprovados com os filtros aplicados.</p>
            <button type="button" className="explorar-card__btn" onClick={clearFilters}>
              Limpar filtros
            </button>
          </div>
        )}

        {!loading && !error && places.length > 0 && (
          <div className="explorar-grid">
            {places.map((place) => {
              const isFav = activeFavoriteIds.includes(place.id);
              const imgSrc = place.coverImage
                ? resolveAssetUrl(place.coverImage)
                : getFallbackImage(place.categoryName);
              const priceLabel =
                place.price === "GRATUITO"
                  ? "Gratuito"
                  : place.estimatedCost
                    ? `R$ ${Number(place.estimatedCost).toFixed(2)}`
                    : PRICE_LABELS[place.price] || "Pago";

              return (
                <article className="explorar-card" key={place.id}>
                  <div className="explorar-card__media" onClick={() => navigate(`/local/${place.id}`)}>
                    <img src={imgSrc} alt={place.name} loading="lazy" />
                    <span
                      className={`explorar-card__price ${place.price !== "GRATUITO" ? "explorar-card__price--paid" : ""}`}
                    >
                      {priceLabel}
                    </span>
                    <button
                      type="button"
                      className={`explorar-card__fav ${isFav ? "explorar-card__fav--active" : ""}`}
                      aria-label={isFav ? "Remover dos favoritos" : "Favoritar local"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(place.id);
                      }}
                    >
                      {isFav ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="explorar-card__body">
                    <span className="explorar-card__category">{place.categoryName || "Cultural"}</span>
                    <h2 className="explorar-card__title" onClick={() => navigate(`/local/${place.id}`)}>
                      {place.name}
                    </h2>
                    <p className="explorar-card__location">
                      {place.city} - {place.state}
                    </p>
                    <p className="explorar-card__desc">{place.description}</p>
                    <div className="explorar-card__footer">
                      <span className="explorar-card__rating">
                        {place.reviewCount > 0
                          ? `★ ${place.averageRating} (${place.reviewCount})`
                          : "Sem avaliações"}
                      </span>
                      <button
                        type="button"
                        className="explorar-card__btn"
                        onClick={() => navigate(`/local/${place.id}`)}
                      >
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
