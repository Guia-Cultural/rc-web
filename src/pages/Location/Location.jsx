/* ==========================================================================
   PÁGINA: LOCATION | Detalhes de um local do RotaCultural.
   Mantém o runtime legado isolado e os blocos visuais em componentes React.
========================================================================== */
import { useEffect, useRef } from "react";
import IconSprite from "../../components/Location/IconSprite/LocationIconSprite";
import Header from "../../components/Location/Header/LocationHeader";
import Hero from "../../components/Location/Hero/LocationHero";
import SectionNav from "../../components/Location/SectionNav/LocationSectionNav";
import Information from "../../components/Location/Information/LocationInformation";
import Gallery from "../../components/Location/Gallery/LocationGallery";
import Hours from "../../components/Location/Hours/LocationHours";
import Map from "../../components/Location/Map/LocationMap";
import Reviews from "../../components/Location/Reviews/LocationReviews";
import Feedback from "../../components/Location/Feedback/LocationFeedback";
import Routes from "../../components/Location/Routes/LocationRoutes";
import Destinations from "../../components/Location/Destinations/LocationDestinations";
import StylePanel from "../../components/Location/StylePanel/LocationStylePanel";
import BackToTop from "../../components/Location/BackToTop/LocationBackToTop";
import Footer from "../../components/Location/Footer/LocationFooter";
import Overlays from "../../components/Location/Overlays/LocationOverlays";
import { initializeLocationCore } from "../../features/Location/scripts/locationCore";
import { initializeLocationInteractions } from "../../features/Location/scripts/locationInteractions";
import "./Location.css";
import "../../components/Location/Header/LocationHeader.css";
import "../../components/Location/Hero/LocationHero.css";
import "../../components/Location/SectionNav/LocationSectionNav.css";
import "../../components/Location/Sections/LocationSections.css";
import "../../components/Location/Information/LocationInformation.css";
import "../../components/Location/Gallery/LocationGallery.css";
import "../../components/Location/Hours/LocationHours.css";
import "../../components/Location/Map/LocationMap.css";
import "../../components/Location/Reviews/LocationReviews.css";
import "../../components/Location/Feedback/LocationFeedback.css";
import "../../components/Location/Routes/LocationRoutes.css";
import "../../components/Location/Destinations/LocationDestinations.css";
import "../../components/Location/Footer/LocationFooter.css";
import "../../components/Location/Overlays/LocationOverlays.css";

export default function Location() {
  const pageRef = useRef(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    root.classList.add("location-page--enhanced", "location-js");
    initializeLocationCore();
    const cleanupInteractions = initializeLocationInteractions(root);

    return () => {
      cleanupInteractions?.();
      root.classList.remove("location-page--enhanced", "location-js");
    };
  }, []);

  return (
    <div className="location-page" ref={pageRef}>
      <IconSprite />
      <Header />
      <main id="app" className="location-page__app">
        <Hero />
        <SectionNav />
        <Information />
        <Gallery />
        <Hours />
        <Map />
        <Reviews />
        <Feedback />
        <Routes />
        <Destinations />
        <StylePanel />
        <BackToTop />
      </main>
      <Footer />
      <Overlays />
    </div>
  );
}
