import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminSection from "../../features/local/components/AdminSection";
import { ResidentTipsSection, VisitorRoutesSection } from "../../features/local/components/CommunitySections";
import GallerySection from "../../features/local/components/GallerySection";
import { HoursSection, LocationSection } from "../../features/local/components/HoursLocationSections";
import InformationSection from "../../features/local/components/InformationSection";
import LocalDialogs, { Lightbox } from "../../features/local/components/LocalDialogs";
import LocalHero from "../../features/local/components/LocalHero";
import LocalNavigation from "../../features/local/components/LocalNavigation";
import OtherPlacesSection from "../../features/local/components/OtherPlacesSection";
import ReviewsSection from "../../features/local/components/ReviewsSection";
import useLocalPage from "../../features/local/hooks/useLocalPage";
import LegacyIcon from "../../components/common/LegacyIcon";
import { useModal } from "../../context/ModalContext";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import "./Location.css";

export default function Location() {
  const rootRef = useRef(null);
  const page = useLocalPage();
  const { openModal } = useModal();
  const navigate = useNavigate();

  useRevealOnScroll(rootRef, page.place?.id || "loading");

  if (page.loading) {
    return (
      <div className="location-page js" style={{ padding: "120px 20px", textAlign: "center" }}>
        <h2>Carregando local cultural...</h2>
        <p>Buscando informações reais no servidor.</p>
      </div>
    );
  }

  if (page.error || !page.place) {
    return (
      <div className="location-page js" style={{ padding: "120px 20px", textAlign: "center" }}>
        <h2>{page.error ? "Não foi possível carregar este local" : "Nenhum local aprovado encontrado"}</h2>
        <p>{page.error || "Explore outros locais disponíveis na plataforma."}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 18 }}>
          <button type="button" className="btn" onClick={() => navigate("/explorar")}>
            Ir para Explorar
          </button>
          <button type="button" className="btn ghost" onClick={page.reload}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const theme = page.place.themeObj;
  const style = {
    "--t": theme.color,
    "--td": theme.dark,
    "--ts": theme.soft,
    "--tb": theme.background,
    "--tx": theme.accent,
    "--tc": theme.contrast,
    "--tm": theme.text,
  };

  return (
    <div className="location-page js" id="app" data-tema={page.place.theme} style={style} ref={rootRef}>
      <LocalHero
        place={page.place}
        allPlaces={page.allPlaces}
        isFavorite={page.isFavorite}
        onFavorite={page.toggleFavorite}
        onShare={page.share}
        onChoosePlace={page.choosePlace}
      />
      <LocalNavigation />
      <InformationSection place={page.place} />
      <GallerySection place={page.place} onOpen={page.setLightbox} />
      <HoursSection place={page.place} />
      <LocationSection place={page.place} />
      <ReviewsSection
        reviews={page.reviews}
        sort={page.reviewSort}
        onSort={page.setReviewSort}
        user={page.user}
        onOpenAuth={() => openModal("entrar")}
        onSaveReview={page.saveReview}
        onDeleteReview={page.deleteReview}
      />
      <ResidentTipsSection
        tips={page.sampleTips}
        user={page.user}
        place={page.place}
        onRegister={() => page.setModal("place")}
        onManage={() => page.setModal("manage")}
      />
      <VisitorRoutesSection routes={page.sampleRoutes} place={page.place} />
      <OtherPlacesSection
        places={page.visiblePlaces}
        allPlaces={page.allPlaces}
        filters={page.filters}
        onFilters={page.setFilters}
        onChoose={page.choosePlace}
      />
      {page.user?.role === "ADMIN" && (
        <AdminSection
          place={page.place}
          onUpdateStatus={page.updatePlaceStatus}
          onManage={() => page.setModal("manage")}
          onRegister={() => page.setModal("place")}
        />
      )}
      <button
        type="button"
        id="toTop"
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <LegacyIcon name="chev-r" />
      </button>
      {page.lightbox !== null && (
        <Lightbox
          place={page.place}
          index={page.lightbox}
          onIndex={page.setLightbox}
          onClose={() => page.setLightbox(null)}
        />
      )}
      <LocalDialogs
        modal={page.modal}
        place={page.place}
        categories={page.categories}
        onClose={() => page.setModal(null)}
        onCreatePlace={page.createPlace}
        onUpdatePlace={page.updatePlace}
        onDeleteImage={page.deletePlaceImage}
      />
      <div className={`gtoast ${page.toast ? "show" : ""}`} role="status" aria-live="polite">
        {page.toast}
      </div>
    </div>
  );
}
