/* ==========================================================================
   PÁGINA HOME — composição das seções do RotaCultural
   Consome locais, categorias, favoritos e recomendações da API real.
   ========================================================================== */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconSprite from "../../components/Shared/IconSprite/IconSprite";
import Hero from "../../components/Home/Hero/Hero";
import Destinos from "../../components/Home/Destinos/Destinos";
import SobreNos from "../../components/Home/SobreNos/SobreNos";
import Roteiros from "../../components/Home/Roteiros/Roteiros";
import Momentos from "../../components/Home/Momentos/Momentos";
import Blog from "../../components/Home/Blog/Blog";
import Recomendacao from "../../components/Home/Recomendacao/Recomendacao";
import Overlays from "../../components/Shared/Overlays/Overlays";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { categoriesService } from "../../services/categoriesService";
import { favoritesService } from "../../services/favoritesService";
import { placesService } from "../../services/placesService";
import { recommendationsService } from "../../services/recommendationsService";
import { initializeHomeInteractions } from "../../features/Visit/scripts/homeInteractions";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const navigate = useNavigate();

  const [apiPlaces, setApiPlaces] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(true);
  const [placesError, setPlacesError] = useState("");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const activeFavoriteIds = useMemo(
    () => (isAuthenticated ? favoriteIds : []),
    [isAuthenticated, favoriteIds]
  );

  useEffect(() => {
    let active = true;
    const loadPublicData = async () => {
      setPlacesLoading(true);
      setPlacesError("");
      try {
        const [placesResp, catsResp] = await Promise.all([
          placesService.getPublicPlaces(),
          categoriesService.getAll(),
        ]);
        if (!active) return;
        setApiPlaces(Array.isArray(placesResp) ? placesResp : []);
        setApiCategories(Array.isArray(catsResp) ? catsResp : []);
      } catch (err) {
        if (!active) return;
        setPlacesError(err.message || "Não foi possível carregar os locais do servidor.");
      } finally {
        if (active) setPlacesLoading(false);
      }
    };
    loadPublicData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (!isAuthenticated) {
      return undefined;
    }
    favoritesService
      .getMyFavorites()
      .then((favs) => {
        if (active) setFavoriteIds(Array.isArray(favs) ? favs.map((f) => f.locId) : []);
      })
      .catch(() => {
        if (active) setFavoriteIds([]);
      });
    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  const handleToggleFavorite = useCallback(
    async (placeId, showToast) => {
      if (!isAuthenticated) {
        openModal("entrar");
        return;
      }
      try {
        if (favoriteIds.includes(placeId)) {
          await favoritesService.removeByPlace(placeId);
          setFavoriteIds((prev) => prev.filter((id) => id !== placeId));
          showToast?.("Removido dos favoritos.");
        } else {
          await favoritesService.add(placeId);
          setFavoriteIds((prev) => [...prev, placeId]);
          showToast?.("Salvo nos favoritos.");
        }
      } catch (err) {
        showToast?.(err.message || "Erro ao atualizar favoritos.");
      }
    },
    [favoriteIds, isAuthenticated, openModal]
  );

  const handleRecommend = useCallback((payload) => {
    return recommendationsService.preview(payload);
  }, []);

  useEffect(() => {
    return initializeHomeInteractions({
      user,
      openModal,
      navigate,
      apiPlaces,
      apiCategories,
      placesLoading,
      placesError,
      favoriteIds: activeFavoriteIds,
      onToggleFavorite: handleToggleFavorite,
      onRecommend: handleRecommend,
    });
  }, [
    apiCategories,
    apiPlaces,
    activeFavoriteIds,
    handleRecommend,
    handleToggleFavorite,
    navigate,
    openModal,
    placesError,
    placesLoading,
    user,
  ]);

  return (
    <>
      <IconSprite />
      <main>
        <Hero />
        <Destinos />
        <SobreNos />
        <Roteiros />
        <Momentos />
        <Blog />
        <Recomendacao />
      </main>
      <Overlays />
    </>
  );
}
