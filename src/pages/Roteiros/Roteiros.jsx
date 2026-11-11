import { useRef, useState } from "react";
import { BudgetStep, GenerateStep } from "../../features/roteiros/components/BudgetGenerateSteps";
import DestinationStep from "../../features/roteiros/components/DestinationStep";
import DetailModal from "../../features/roteiros/components/DetailModal";
import { FoodStep, StayStep, TransportStep } from "../../features/roteiros/components/FoodStayTransportSteps";
import ItineraryResults from "../../features/roteiros/components/ItineraryResults";
import { AttractionsStep, ProfileStep } from "../../features/roteiros/components/ProfileAttractionsSteps";
import RoteirosHero from "../../features/roteiros/components/RoteirosHero";
import { roteiroThemes } from "../../features/roteiros/data/roteiroData";
import useItineraryBuilder from "../../features/roteiros/hooks/useItineraryBuilder";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import "./Roteiros.css";

export default function Roteiros() {
  const [themeKey, setThemeKey] = useState("neutro");
  const [detail, setDetail] = useState(null);
  const rootRef = useRef(null);
  const builder = useItineraryBuilder();
  const theme = roteiroThemes[themeKey];
  useRevealOnScroll(rootRef, `${themeKey}-${builder.generated}`);

  const style = {
    "--t": theme.color, "--td": theme.dark, "--ts": theme.soft, "--tb": theme.background,
    "--tx": theme.accent, "--tc": theme.contrast, "--tm": theme.text,
    "--hi": theme.color, "--hit": theme.text, "--hg": `linear-gradient(135deg, ${theme.dark}, ${theme.accent})`,
  };

  return <div className="roteiros-page js" id="app" data-tema={themeKey} style={style} ref={rootRef}>
    <i className="pbar" />
    <div id="wiz">
      <RoteirosHero themeKey={themeKey} onTheme={setThemeKey} />
      <DestinationStep form={builder.form} update={builder.update} themeKey={themeKey} />
      <ProfileStep form={builder.form} update={builder.update} />
      <AttractionsStep form={builder.form} update={builder.update} toggle={builder.toggle} onDetail={setDetail} />
      <FoodStep form={builder.form} toggle={builder.toggle} />
      <StayStep form={builder.form} update={builder.update} onDetail={setDetail} />
      <TransportStep form={builder.form} toggle={builder.toggle} />
      <BudgetStep form={builder.form} update={builder.update} totals={builder.totals} groupCount={builder.groupCount} />
      <GenerateStep form={builder.form} error={builder.error} onGenerate={builder.generate} onReset={builder.reset} />
    </div>
    {builder.generated ? <ItineraryResults form={builder.form} theme={theme} totals={builder.totals} itinerary={builder.itinerary} activeDay={builder.activeDay} onDay={builder.setActiveDay} onEdit={() => document.querySelector("#destino")?.scrollIntoView({ behavior: "smooth" })} onCopy={builder.copySummary} /> : null}
    <DetailModal detail={detail} onClose={() => setDetail(null)} />
    <div className="rdock" aria-live="polite"><span className="dk"><b>{builder.form.destination || "Seu roteiro"}</b><small>{builder.form.destination ? `${builder.form.days} dias · ${builder.form.group || "defina o perfil"}` : "Comece escolhendo o destino"}</small></span><span className="dkp"><i style={{ width: `${[builder.form.destination, builder.form.group, builder.form.pace, builder.form.attractions.length, builder.form.stay].filter(Boolean).length * 20}%` }} /></span><a className="btn sm" href="#gerar">Gerar</a></div>
    <div className={`rtoast ${builder.toast ? "show" : ""}`} role="status">{builder.toast}</div>
  </div>;
}
