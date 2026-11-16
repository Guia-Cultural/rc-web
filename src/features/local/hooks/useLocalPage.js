import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useModal } from "../../../context/ModalContext";
import { resolveAssetUrl } from "../../../services/apiClient";
import { categoriesService } from "../../../services/categoriesService";
import { favoritesService } from "../../../services/favoritesService";
import { feedbacksService } from "../../../services/feedbacksService";
import { placesService } from "../../../services/placesService";
import { localImage } from "../data/images";
import { residentTips, themes, visitorRoutes } from "../data/localData";

const PRICE_TEXT = {
  GRATUITO: "Entrada gratuita",
  BARATO: "Faixa econômica (Barato)",
  MODERADO: "Faixa moderada",
  CARO: "Faixa confortável / Caro",
};

function resolveThemeKey(categoryName = "", city = "") {
  const hay = `${categoryName} ${city}`.toLowerCase();
  if (hay.includes("praia")) return "praias";
  if (hay.includes("natur") || hay.includes("eco") || hay.includes("parque")) return "natureza";
  if (hay.includes("avent") || hay.includes("trilha") || hay.includes("mirante")) return "aventura";
  if (hay.includes("urb") || hay.includes("gastr") || hay.includes("são paulo") || hay.includes("rio de janeiro")) {
    if (hay.includes("arte") || hay.includes("museu") || hay.includes("hist")) return "historico";
    return "cidades";
  }
  if (hay.includes("hist") || hay.includes("arte") || hay.includes("museu")) return "historico";
  if (hay.includes("serra") || hay.includes("campos")) return "montanhas";
  return "historico";
}

function adaptPlace(apiPlace) {
  if (!apiPlace) return null;
  const themeKey = resolveThemeKey(apiPlace.categoryName, apiPlace.city);
  const theme = themes[themeKey] || themes.historico;

  const uploadedImages = Array.isArray(apiPlace.images)
    ? apiPlace.images.map((img) => ({
        id: img.id,
        url: resolveAssetUrl(img.url),
        name: img.originalName || apiPlace.name,
        cover: Boolean(img.cover),
        uploaded: true,
      }))
    : [];

  const gallery =
    uploadedImages.length > 0
      ? uploadedImages
      : theme.gallery.map((key, idx) => ({
          id: `fallback-${idx}`,
          url: localImage(key),
          name: `${apiPlace.name} — ilustrativa ${idx + 1}`,
          cover: idx === 0,
          uploaded: false,
        }));

  const heroUrl = apiPlace.coverImage
    ? resolveAssetUrl(apiPlace.coverImage)
    : uploadedImages[0]?.url || localImage(theme.hero);

  const cardUrl = apiPlace.coverImage
    ? resolveAssetUrl(apiPlace.coverImage)
    : uploadedImages[0]?.url || localImage(theme.card);

  return {
    ...apiPlace,
    theme: themeKey,
    themeObj: theme,
    location: `${apiPlace.city}, ${apiPlace.state}`,
    category: apiPlace.categoryName || "Cultural",
    paid: apiPlace.price !== "GRATUITO",
    priceLabel:
      apiPlace.estimatedCost !== null && apiPlace.estimatedCost !== undefined
        ? apiPlace.price === "GRATUITO"
          ? "Gratuito"
          : `R$ ${Number(apiPlace.estimatedCost).toFixed(2)}`
        : PRICE_TEXT[apiPlace.price] || "Consulte o local",
    heroUrl,
    cardUrl,
    gallery,
    uploadedImages,
  };
}

export default function useLocalPage() {
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { openModal } = useModal();

  const targetPlaceId = routeId || searchParams.get("id");

  const [allPlaces, setAllPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentApiPlace, setCurrentApiPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const activeFavoriteIds = isAuthenticated ? favoriteIds : [];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState("");
  const [reviewSort, setReviewSort] = useState("recentes");
  const [filters, setFilters] = useState({ query: "", state: "", price: "" });

  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const loadCatalogAndPlace = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [publicList, catsList] = await Promise.all([
        placesService.getPublicPlaces(),
        categoriesService.getAll().catch(() => []),
      ]);
      const safeList = Array.isArray(publicList) ? publicList : [];
      setAllPlaces(safeList);
      setCategories(Array.isArray(catsList) ? catsList : []);

      let selected = null;
      if (targetPlaceId) {
        selected = await placesService.getById(targetPlaceId);
      } else if (safeList.length > 0) {
        selected = safeList[0];
      }
      setCurrentApiPlace(selected);

      if (selected?.id) {
        const fbList = await feedbacksService.getByPlace(selected.id).catch(() => []);
        setReviews(Array.isArray(fbList) ? fbList : []);
      } else {
        setReviews([]);
      }
    } catch (err) {
      setError(err.message || "Não foi possível carregar os dados do local.");
      setCurrentApiPlace(null);
    } finally {
      setLoading(false);
    }
  }, [targetPlaceId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadCatalogAndPlace();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadCatalogAndPlace]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    favoritesService
      .getMyFavorites()
      .then((favs) => setFavoriteIds(Array.isArray(favs) ? favs.map((f) => f.locId) : []))
      .catch(() => setFavoriteIds([]));
  }, [isAuthenticated]);

  const place = useMemo(() => adaptPlace(currentApiPlace), [currentApiPlace]);

  useEffect(() => {
    if (place?.name) {
      document.title = `${place.name} – Rota Cultural`;
    } else {
      document.title = "Locais – Rota Cultural";
    }
  }, [place?.name]);

  const adaptedList = useMemo(() => allPlaces.map(adaptPlace).filter(Boolean), [allPlaces]);

  const visiblePlaces = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase("pt-BR");
    return adaptedList.filter((item) => {
      const matchesQuery =
        !query || `${item.name} ${item.location} ${item.category}`.toLocaleLowerCase("pt-BR").includes(query);
      const matchesState = !filters.state || item.state === filters.state;
      const matchesPrice =
        !filters.price || (filters.price === "g" ? !item.paid : item.paid);
      return matchesQuery && matchesState && matchesPrice;
    });
  }, [adaptedList, filters]);

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (reviewSort === "melhor") return Number(b.assessment) - Number(a.assessment);
      if (reviewSort === "pior") return Number(a.assessment) - Number(b.assessment);
      return String(b.dateCreate || b.id).localeCompare(String(a.dateCreate || a.id));
    });
  }, [reviewSort, reviews]);

  const isFavorite = Boolean(place?.id && activeFavoriteIds.includes(place.id));

  const choosePlace = (nextId) => {
    navigate(`/local/${nextId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = async () => {
    if (!place?.id) return;
    if (!isAuthenticated) {
      openModal("entrar");
      return;
    }
    try {
      if (isFavorite) {
        await favoritesService.removeByPlace(place.id);
        setFavoriteIds((prev) => prev.filter((id) => id !== place.id));
        showToast("Local removido dos favoritos.");
      } else {
        await favoritesService.add(place.id);
        setFavoriteIds((prev) => [...prev, place.id]);
        showToast("Local salvo nos favoritos.");
      }
    } catch (err) {
      showToast(err.message || "Erro ao atualizar favoritos.");
    }
  };

  const share = async () => {
    if (!place) return;
    const data = { title: place.name, text: place.description, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(`${data.title} — ${data.url}`);
      showToast("Link pronto para compartilhar.");
    } catch (err) {
      if (err?.name !== "AbortError") showToast("Não foi possível compartilhar agora.");
    }
  };

  const saveReview = async ({ assessment, commentary, existingId }) => {
    if (!place?.id) return;
    if (!isAuthenticated) {
      openModal("entrar");
      return;
    }
    try {
      if (existingId) {
        await feedbacksService.update(existingId, {
          locId: place.id,
          assessment,
          commentary,
        });
        showToast("Avaliação atualizada com sucesso.");
      } else {
        await feedbacksService.create({
          locId: place.id,
          assessment,
          commentary,
        });
        showToast("Avaliação publicada com sucesso.");
      }
      await loadCatalogAndPlace();
    } catch (err) {
      showToast(err.message || "Não foi possível salvar a avaliação.");
    }
  };

  const deleteReview = async (feedbackId) => {
    try {
      await feedbacksService.remove(feedbackId);
      showToast("Avaliação removida.");
      await loadCatalogAndPlace();
    } catch (err) {
      showToast(err.message || "Erro ao remover avaliação.");
    }
  };

  const createPlace = async (payload, files, existingPlaceId = null) => {
    let targetId = existingPlaceId;
    let status = "EM_AVALIACAO";
    if (!targetId) {
      const created = await placesService.create(payload);
      targetId = created?.id || null;
      status = created?.status || "EM_AVALIACAO";
    }
    if (files?.length && targetId) {
      try {
        await placesService.uploadImages(targetId, files, true);
      } catch (uploadErr) {
        const err = new Error(
          `Local #${targetId} salvo (${status}), mas o envio das fotos falhou: ${uploadErr.message}. Ajuste os arquivos e clique em "Reenviar fotos" sem duplicar o local.`,
          { cause: uploadErr }
        );
        err.createdPlaceId = targetId;
        throw err;
      }
    }
    setModal(null);
    showToast(
      status === "APROVADO"
        ? "Local cadastrado e aprovado."
        : "Local enviado para avaliação do administrador (EM_AVALIACAO)."
    );
    await loadCatalogAndPlace();
    if (targetId) {
      navigate(`/local/${targetId}`);
    }
  };

  const updatePlace = async (payload, newFiles) => {
    if (!place?.id) return;
    await placesService.update(place.id, payload);
    if (newFiles?.length) {
      await placesService.uploadImages(place.id, newFiles, false);
    }
    setModal(null);
    showToast("Local atualizado com sucesso.");
    await loadCatalogAndPlace();
  };

  const deletePlaceImage = async (imageId) => {
    if (!place?.id) return;
    await placesService.deleteImage(place.id, imageId);
    showToast("Imagem removida.");
    await loadCatalogAndPlace();
  };

  const updatePlaceStatus = async (status, rejectionReason = "") => {
    if (!place?.id) return;
    try {
      await placesService.updateStatus(place.id, status, rejectionReason);
      showToast(`Status alterado para ${status}.`);
      await loadCatalogAndPlace();
    } catch (err) {
      showToast(err.message || "Erro ao atualizar status.");
    }
  };

  return {
    loading,
    error,
    place,
    allPlaces: adaptedList,
    categories,
    user,
    isAuthenticated,
    isFavorite,
    toggleFavorite,
    share,
    choosePlace,
    reviews: sortedReviews,
    reviewSort,
    setReviewSort,
    saveReview,
    deleteReview,
    createPlace,
    updatePlace,
    deletePlaceImage,
    updatePlaceStatus,
    modal,
    setModal,
    lightbox,
    setLightbox,
    toast,
    showToast,
    filters,
    setFilters,
    visiblePlaces,
    sampleTips: residentTips,
    sampleRoutes: visitorRoutes,
    reload: loadCatalogAndPlace,
  };
}
