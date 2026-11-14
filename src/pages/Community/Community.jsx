/* ==========================================================================
   PÁGINA: COMMUNITY | Blog da comunidade RotaCultural.
   A página só inicia seu runtime quando o perfil tem permissão de acesso.
========================================================================== */
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { initializeCommunityInteractions } from "../../features/Community/scripts/communityInteractions";
import { canAccessCommunity } from "../../features/Community/data/communityAccess";
import IconSprite from "../../components/Community/IconSprite/CommunityIconSprite";
import Header from "../../components/Community/Header/CommunityHeader";
import Hero from "../../components/Community/Hero/CommunityHero";
import MarqueeIntro from "../../components/Community/Marquee/CommunityMarqueeIntro";
import Rules from "../../components/Community/Rules/CommunityRules";
import StoryComposer from "../../components/Community/StoryComposer/StoryComposer";
import MarqueeBlue from "../../components/Community/Marquee/CommunityMarqueeBlue";
import Highlights from "../../components/Community/Highlights/CommunityHighlights";
import MarqueeOrange from "../../components/Community/Marquee/CommunityMarqueeOrange";
import Feed from "../../components/Community/Feed/CommunityFeed";
import MarqueePink from "../../components/Community/Marquee/CommunityMarqueePink";
import Footer from "../../components/Community/Footer/CommunityFooter";
import Overlays from "../../components/Community/Overlays/CommunityOverlays";
import "./Community.css";
import "../../components/Community/Header/CommunityHeader.css";
import "../../components/Community/Hero/CommunityHero.css";
import "../../components/Community/Rules/CommunityRules.css";
import "../../components/Community/StoryComposer/StoryComposer.css";
import "../../components/Community/Highlights/CommunityHighlights.css";
import "../../components/Community/Feed/CommunityFeed.css";
import "../../components/Community/Marquee/CommunityMarquee.css";
import "../../components/Community/Footer/CommunityFooter.css";
import "../../components/Community/Overlays/CommunityOverlays.css";

function AccessDenied() {
  return (
    <main className="community-access">
      <section className="community-access__card" role="status">
        <span className="community-access__eyebrow">RotaCultural · Comunidade</span>
        <h1 className="community-access__title">Entre na comunidade</h1>
        <p className="community-access__description">
          Esta página é reservada para viajantes, moradores locais e administradores nativos.
          Entre com uma conta autorizada para continuar.
        </p>
      </section>
    </main>
  );
}

function CommunityContent({ user }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const cleanup = initializeCommunityInteractions(pageRef.current, user);
    return cleanup;
  }, [user]);

  return (
    <div className="community-page" ref={pageRef}>
      <IconSprite />
      <Header />
      <main className="community-page__main">
        <Hero />
        <MarqueeIntro />
        <Rules />
        <StoryComposer />
        <MarqueeBlue />
        <Highlights />
        <MarqueeOrange />
        <Feed />
        <MarqueePink />
      </main>
      <Footer />
      <Overlays />
    </div>
  );
}

export default function Community() {
  const { user } = useAuth();
  if (!canAccessCommunity(user)) return <AccessDenied />;
  return <CommunityContent user={user} />;
}
