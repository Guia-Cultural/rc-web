/* ==========================================================================
   PÁGINA HOME — composição das seções do RotaCultural
   A lógica de interação original é inicializada após a montagem do DOM.
========================================================================== */
import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IconSprite from "../../components/Shared/IconSprite/IconSprite";
import Hero from "../../components/Home/Hero/Hero";
import Destinos from "../../components/Home/Destinos/Destinos";
import SobreNos from "../../components/Home/SobreNos/SobreNos";
import Roteiros from "../../components/Home/Roteiros/Roteiros";
import Momentos from "../../components/Home/Momentos/Momentos";
import Blog from "../../components/Home/Blog/Blog";
import Recomendacao from "../../components/Home/Recomendacao/Recomendacao";
import Overlays from "../../components/Shared/Overlays/Overlays";

export default function Home() {
  useEffect(() => {
    // Import dinâmico: o script usa seletores DOM e precisa que a Home exista.
    import("../../features/Visit/scripts/homeInteractions.js");
  }, []);

  return (
    <>
      <IconSprite />
      <Header />
      <main>
        <Hero />
        <Destinos />
        <SobreNos />
        <Roteiros />
        <Momentos />
        <Blog />
        <Recomendacao />
      </main>
      <Footer />
      <Overlays />
    </>
  );
}
