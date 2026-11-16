/* ==========================================================================
   PÁGINA: COMMUNITY | Blog da comunidade RotaCultural.
   O feed interativo de histórias é demonstrativo (escopo P2),
   protegido pela autenticação JWT real via AuthContext.
   ========================================================================== */
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { initializeCommunityInteractions } from "../../features/Community/scripts/communityInteractions";
import { canAccessCommunity } from "../../features/Community/data/communityAccess";
import IconSprite from "../../components/Community/IconSprite/CommunityIconSprite";
import Hero from "../../components/Community/Hero/CommunityHero";
import MarqueeIntro from "../../components/Community/Marquee/CommunityMarqueeIntro";
import Rules from "../../components/Community/Rules/CommunityRules";
import StoryComposer from "../../components/Community/StoryComposer/StoryComposer";
import MarqueeBlue from "../../components/Community/Marquee/CommunityMarqueeBlue";
import Highlights from "../../components/Community/Highlights/CommunityHighlights";
import MarqueeOrange from "../../components/Community/Marquee/CommunityMarqueeOrange";
import Feed from "../../components/Community/Feed/CommunityFeed";
import MarqueePink from "../../components/Community/Marquee/CommunityMarqueePink";
import Overlays from "../../components/Community/Overlays/CommunityOverlays";
import "./Community.css";
import "../../components/Community/Hero/CommunityHero.css";
import "../../components/Community/Rules/CommunityRules.css";
import "../../components/Community/StoryComposer/StoryComposer.css";
import "../../components/Community/Highlights/CommunityHighlights.css";
import "../../components/Community/Feed/CommunityFeed.css";
import "../../components/Community/Marquee/CommunityMarquee.css";
import "../../components/Community/Overlays/CommunityOverlays.css";

function AccessDenied() {
  const { openModal } = useModal();
  return (
    <main className="community-access">
      <section className="community-access__card" role="status">
        <span className="community-access__eyebrow">RotaCultural · Comunidade</span>
        <h1 className="community-access__title">Entre na comunidade</h1>
        <p className="community-access__description">
          Esta página é reservada para usuários autenticados (viajantes, nativos e administradores).
          Entre com sua conta para explorar os relatos demonstrativos da comunidade.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "18px", flexWrap: "wrap" }}>
          <button type="button" className="button" onClick={() => openModal("entrar")}>
            Entrar
          </button>
          <button type="button" className="button button--ghost" onClick={() => openModal("cadastrar")}>
            Criar conta
          </button>
        </div>
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
      <div
        style={{
          background: "#fffbeb",
          color: "#92400e",
          textAlign: "center",
          padding: "8px 16px",
          fontSize: "0.88rem",
          fontWeight: 700,
          borderBottom: "1px solid #fde68a",
        }}
      >
        Área demonstrativa de relatos da comunidade (evolução P2). Para locais e roteiros reais conectados ao banco, use Explorar e Roteiros.
      </div>
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
      <Overlays />
    </div>
  );
}

export default function Community() {
  const { user } = useAuth();
  if (!canAccessCommunity(user)) return <AccessDenied />;
  return <CommunityContent user={user} />;
}
