import { useMemo, useState } from "react";
import { attractionGroups, groupSizes } from "../data/roteiroData";

const initialState = {
  destination: "", state: "", days: 3, group: "", pace: "", attractions: [], attractionFilter: "all",
  meals: [], food: [], stay: "", transports: [], budgetProfile: "", costs: { lodging: 0, food: 0, tickets: 0, transport: 0 },
};

export default function useItineraryBuilder() {
  const [form, setForm] = useState(initialState);
  const [generated, setGenerated] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const groupCount = groupSizes[form.group] ?? 1;
  const perPerson = Object.values(form.costs).reduce((sum, value) => sum + Number(value || 0), 0);
  const totals = { perPerson, perDay: perPerson / form.days, group: perPerson * groupCount };

  const selectedAttractions = useMemo(() => attractionGroups.flatMap((group) => group.items.map((item) => ({ group: group.name, name: item[0], price: item[1], hours: item[2], rating: item[3], image: group.image }))).filter((item) => form.attractions.includes(item.name)), [form.attractions]);
  const itinerary = useMemo(() => Array.from({ length: form.days }, (_, index) => {
    const attractions = selectedAttractions.filter((_, attractionIndex) => attractionIndex % form.days === index);
    return { day: index + 1, dateLabel: `Dia ${index + 1}`, items: attractions.length ? attractions : [{ name: index === 0 ? "Chegada e reconhecimento do destino" : "Tempo livre para descobertas", hours: index === 0 ? "14:00" : "09:00", price: 0, group: "Sugestão local" }] };
  }), [form.days, selectedAttractions]);

  const update = (patch) => setForm((current) => ({ ...current, ...patch }));
  const toggle = (field, value) => setForm((current) => ({ ...current, [field]: current[field].includes(value) ? current[field].filter((item) => item !== value) : [...current[field], value] }));
  const generate = () => {
    const missing = [!form.destination && "um destino", !form.group && "quem vai", !form.pace && "o ritmo", !form.attractions.length && "ao menos uma atração", !form.stay && "uma hospedagem"].filter(Boolean);
    if (missing.length) {
      setError(`Antes de gerar, escolha ${missing.join(", ")}.`);
      return;
    }
    setError(""); setGenerated(true); setActiveDay(0);
    window.setTimeout(() => document.querySelector("#resultado")?.scrollIntoView({ behavior: "smooth" }), 0);
  };
  const reset = () => { setForm(initialState); setGenerated(false); setError(""); setActiveDay(0); };
  const copySummary = async () => {
    const summary = `${form.destination} · ${form.days} dias · ${form.group} · ${form.pace}\n${itinerary.map((day) => `${day.dateLabel}: ${day.items.map((item) => item.name).join(", ")}`).join("\n")}\nEstimativa do grupo: R$ ${Math.round(totals.group).toLocaleString("pt-BR")}`;
    try { await navigator.clipboard.writeText(summary); setToast("Resumo copiado."); } catch { setToast("Não foi possível copiar o resumo."); }
    window.setTimeout(() => setToast(""), 2500);
  };
  return { form, update, toggle, generated, generate, reset, totals, groupCount, selectedAttractions, itinerary, activeDay, setActiveDay, error, toast, copySummary };
}
