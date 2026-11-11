import Blog from "../../components/Home/Blog/Blog";
import Destinos from "../../components/Home/Destinos/Destinos";
import Hero from "../../components/Home/Hero/Hero";
import Momentos from "../../components/Home/Momentos/Momentos";
import Recomendacao from "../../components/Home/Recomendacao/Recomendacao";
import Roteiros from "../../components/Home/Roteiros/Roteiros";
import SobreNos from "../../components/Home/SobreNos/SobreNos";
import "./Home.css";

export default function Home() {
  return <main className="home-page" id="inicio"><Hero /><Destinos /><SobreNos /><Roteiros /><Momentos /><Blog /><Recomendacao /></main>;
}
