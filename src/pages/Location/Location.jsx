import { useRef } from "react";
import AdminSection from "../../features/local/components/AdminSection";
import { ResidentTipsSection, VisitorRoutesSection } from "../../features/local/components/CommunitySections";
import DemoRoleSwitcher from "../../features/local/components/DemoRoleSwitcher";
import GallerySection from "../../features/local/components/GallerySection";
import { HoursSection, LocationSection } from "../../features/local/components/HoursLocationSections";
import InformationSection from "../../features/local/components/InformationSection";
import LocalDialogs, { Lightbox } from "../../features/local/components/LocalDialogs";
import LocalHero from "../../features/local/components/LocalHero";
import LocalNavigation from "../../features/local/components/LocalNavigation";
import OtherPlacesSection from "../../features/local/components/OtherPlacesSection";
import ReviewsSection from "../../features/local/components/ReviewsSection";
import useLocalPage from "../../features/local/hooks/useLocalPage";
import { themes } from "../../features/local/data/localData";
import LegacyIcon from "../../components/common/LegacyIcon";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import "./Location.css";

export default function Location() {
  const rootRef = useRef(null);
  const page = useLocalPage();
  const theme = themes[page.place.theme];
  useRevealOnScroll(rootRef, page.place.slug);

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
      <LocalHero place={page.place} isFavorite={page.isFavorite} onFavorite={page.toggleFavorite} onShare={page.share} onChoosePlace={page.choosePlace} />
      <LocalNavigation />
      <InformationSection place={page.place} />
      <GallerySection place={page.place} onOpen={page.setLightbox} />
      <HoursSection place={page.place} />
      <LocationSection place={page.place} />
      <ReviewsSection reviews={page.reviews} sort={page.reviewSort} onSort={page.setReviewSort} role={page.role} onAdd={page.addReview} onReport={() => page.setModal("report")} />
      <ResidentTipsSection tips={page.tips} role={page.role} onCreate={() => page.setModal("tip")} onRegister={() => page.setModal("place")} />
      <VisitorRoutesSection routes={page.routes} onCreate={() => page.setModal("route")} />
      <OtherPlacesSection places={page.visiblePlaces} filters={page.filters} onFilters={page.setFilters} onChoose={page.choosePlace} />
      {page.role === "admin" ? <AdminSection reports={page.reports} approved={page.approved} onApproved={page.setApproved} onManage={() => page.setModal("manage")} onRegister={() => page.setModal("place")} /> : null}
      <DemoRoleSwitcher role={page.role} onChange={page.setRole} />
      <button type="button" id="toTop" aria-label="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><LegacyIcon name="chev-r" /></button>
      {page.lightbox !== null ? <Lightbox place={page.place} index={page.lightbox} onIndex={page.setLightbox} onClose={() => page.setLightbox(null)} /> : null}
      <LocalDialogs modal={page.modal} place={page.place} onClose={() => page.setModal(null)} onReport={page.addReport} onTip={page.addTip} onRoute={page.addRoute} onComplete={page.completeDemo} />
      <div className={`gtoast ${page.toast ? "show" : ""}`} role="status" aria-live="polite">{page.toast}</div>
    </div>
  );
}
