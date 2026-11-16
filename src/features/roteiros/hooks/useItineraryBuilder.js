import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useModal } from "../../../context/ModalContext";
import { resolveAssetUrl } from "../../../services/apiClient";
import { categoriesService } from "../../../services/categoriesService";
import { itinerariesService } from "../../../services/itinerariesService";
import { placesService } from "../../../services/placesService";
import { recommendationsService } from "../../../services/recommendationsService";
import { tripsService } from "../../../services/tripsService";
import { roteiroImage } from "../data/images";
import { groupSizes } from "../data/roteiroData";

function toIsoDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function addDaysIso(isoDate, offset) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return toIsoDate(offset);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function diffDaysInclusive(startIso, endIso) {
  if (!startIso || !endIso) return 3;
  const start = new Date(`${startIso}T00:00:00`);
  const end = new Date(`${endIso}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 3;
  return Math.round((end - start) / 86400000) + 1;
}

function getPlaceFallbackImage(categoryName = "") {
  const norm = categoryName.toLowerCase();
  if (norm.includes("praia")) return roteiroImage("card-praias");
  if (norm.includes("natur") || norm.includes("eco")) return roteiroImage("card-natureza");
  if (norm.includes("avent")) return roteiroImage("card-aventura");
  if (norm.includes("urb") || norm.includes("gastr")) return roteiroImage("card-cidades");
  return roteiroImage("card-historico");
}

function formatPlacePrice(price, estimatedCost) {
  if (price === "GRATUITO") return "Gratuito";
  if (estimatedCost !== null && estimatedCost !== undefined && Number(estimatedCost) > 0) {
    return `R$ ${Number(estimatedCost).toFixed(2)}`;
  }
  if (price === "BARATO") return "Barato";
  if (price === "MODERADO") return "Moderado";
  if (price === "CARO") return "Caro";
  return "Consulte";
}

function normalizeText(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const initialStart = toIsoDate(7);
const initialEnd = addDaysIso(initialStart, 2);

const initialState = {
  destination: "",
  state: "",
  startDate: initialStart,
  endDate: initialEnd,
  days: 3,
  group: "Solo",
  pace: "Equilibrado",
  categoryIds: [],
  attractions: [],
  attractionFilter: "all",
  meals: [],
  food: [],
  stay: "",
  transports: [],
  budgetProfile: "",
  costs: { lodging: 0, food: 0, tickets: 0, transport: 0 },
};

export default function useItineraryBuilder() {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState(() => ({
    ...initialState,
    destination: searchParams.get("destino") || "",
  }));
  const [categories, setCategories] = useState([]);
  const [approvedPlaces, setApprovedPlaces] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [persistedDays, setPersistedDays] = useState([]);
  const [recommendationInfo, setRecommendationInfo] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [generated, setGenerated] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const showToast = useCallback((msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 3000);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      categoriesService.getAll().catch(() => []),
      placesService.getPublicPlaces().catch(() => []),
    ])
      .then(([cats, pls]) => {
        if (!active) return;
        setCategories(Array.isArray(cats) ? cats : []);
        const enriched = (Array.isArray(pls) ? pls : []).map((p) => ({
          ...p,
          imageUrl: p.coverImage ? resolveAssetUrl(p.coverImage) : getPlaceFallbackImage(p.categoryName),
          priceLabel: formatPlacePrice(p.price, p.estimatedCost),
        }));
        setApprovedPlaces(enriched);
      })
      .finally(() => {
        if (active) setLoadingCatalog(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const refreshSavedTrips = useCallback(async () => {
    if (!isAuthenticated) {
      setSavedTrips([]);
      return;
    }
    try {
      const list = await tripsService.getMyTrips();
      setSavedTrips(Array.isArray(list) ? list : []);
    } catch {
      setSavedTrips([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      refreshSavedTrips();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [refreshSavedTrips]);

  const groupDaysFromItems = useCallback((items, startDate, totalDays) => {
    const byDayMap = new Map();
    items.forEach((item) => {
      const key = item.day;
      if (!byDayMap.has(key)) byDayMap.set(key, []);
      byDayMap.get(key).push({
        id: item.id,
        locId: item.locId,
        name: item.placeName || `Local #${item.locId}`,
        hours: item.placeBusinessHours || "Consulte o local",
        description: item.description || "",
        price: item.estimatedCost !== null && item.estimatedCost !== undefined ? Number(item.estimatedCost) : null,
        priceLabel: formatPlacePrice(item.price, item.estimatedCost),
        group: item.categoryName || "Cultural",
        city: item.placeCity,
        state: item.placeState,
        address: item.placeAddress,
      });
    });

    const daysCount = Math.max(1, totalDays || byDayMap.size || 1);
    const result = [];
    for (let i = 0; i < daysCount; i++) {
      const dateStr = startDate ? addDaysIso(startDate, i) : `Dia ${i + 1}`;
      const formattedDate = startDate
        ? new Date(`${dateStr}T00:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
        : "";
      const dayItems = byDayMap.get(dateStr) || [];
      result.push({
        day: i + 1,
        dateIso: dateStr,
        dateLabel: formattedDate ? `Dia ${i + 1} (${formattedDate})` : `Dia ${i + 1}`,
        items: dayItems,
      });
    }
    return result.filter((d) => d.items.length > 0 || result.length <= 7);
  }, []);

  const loadSavedTrip = useCallback(
    async (tripId) => {
      if (!isAuthenticated || !tripId) return;
      setSubmitting(true);
      setError("");
      try {
        const [trip, items] = await Promise.all([
          tripsService.getById(tripId),
          itinerariesService.getByTrip(tripId),
        ]);
        const daysCount = diffDaysInclusive(trip.startDate, trip.endDate);
        setForm((prev) => ({
          ...prev,
          destination: trip.destination,
          startDate: trip.startDate,
          endDate: trip.endDate,
          days: Math.max(1, Math.min(30, daysCount)),
          categoryIds: Array.isArray(trip.preferences) ? trip.preferences.map((p) => p.catId) : [],
          costs: {
            ...prev.costs,
            lodging: Number(trip.budget || 0),
            food: 0,
            tickets: 0,
            transport: 0,
          },
        }));
        setActiveTrip(trip);
        setPersistedDays(groupDaysFromItems(Array.isArray(items) ? items : [], trip.startDate, daysCount));
        setIsPreviewMode(false);
        setRecommendationInfo("Roteiro recuperado do banco de dados.");
        setGenerated(true);
        setActiveDay(0);
        window.setTimeout(() => document.querySelector("#resultado")?.scrollIntoView({ behavior: "smooth" }), 50);
      } catch (err) {
        setError(err.message || "Não foi possível carregar o roteiro salvo.");
      } finally {
        setSubmitting(false);
      }
    },
    [groupDaysFromItems, isAuthenticated]
  );

  useEffect(() => {
    const tripIdParam = searchParams.get("tripId");
    if (tripIdParam && isAuthenticated) {
      const timer = window.setTimeout(() => {
        loadSavedTrip(tripIdParam);
      }, 0);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [isAuthenticated, loadSavedTrip, searchParams]);

  const groupCount = groupSizes[form.group] ?? 1;
  const perPerson = Object.values(form.costs).reduce((sum, value) => sum + Number(value || 0), 0);
  const totals = {
    perPerson,
    perDay: perPerson / Math.max(form.days, 1),
    group: perPerson * groupCount,
  };

  const availableCities = useMemo(() => {
    const map = new Map();
    approvedPlaces.forEach((p) => {
      const label = `${p.city} - ${p.state}`;
      map.set(label, (map.get(label) || 0) + 1);
    });
    return [...map.entries()].map(([label, count]) => ({ label, count }));
  }, [approvedPlaces]);

  const filteredAttractions = useMemo(() => {
    const destTokens = normalizeText(form.destination)
      .split(/[-,|/–]+/)
      .map((t) => t.trim())
      .filter((t) => t.length >= 2);

    return approvedPlaces.filter((place) => {
      if (form.categoryIds.length > 0 && !form.categoryIds.includes(place.catId)) {
        return false;
      }
      if (form.attractionFilter === "free" && place.price !== "GRATUITO") {
        return false;
      }
      if (form.attractionFilter === "paid" && place.price === "GRATUITO") {
        return false;
      }
      if (destTokens.length > 0) {
        const cityNorm = normalizeText(place.city);
        const stateNorm = normalizeText(place.state);
        const matchesDest = destTokens.some(
          (tok) => cityNorm.includes(tok) || tok.includes(cityNorm) || stateNorm === tok
        );
        if (!matchesDest) return false;
      }
      return true;
    });
  }, [approvedPlaces, form.attractionFilter, form.categoryIds, form.destination]);

  const update = (patch) => {
    setForm((current) => {
      const next = { ...current, ...patch };
      if (patch.days !== undefined && patch.startDate === undefined && patch.endDate === undefined) {
        const clamped = Math.max(1, Math.min(30, Number(patch.days)));
        next.days = clamped;
        next.endDate = addDaysIso(next.startDate, clamped - 1);
      } else if (patch.startDate !== undefined || patch.endDate !== undefined) {
        const diff = diffDaysInclusive(next.startDate, next.endDate);
        if (diff >= 1 && diff <= 30) {
          next.days = diff;
        }
      }
      return next;
    });
  };

  const toggle = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }));
  };

  const generate = async () => {
    const daysCount = diffDaysInclusive(form.startDate, form.endDate);
    if (!form.destination.trim()) {
      setError("Escolha ou digite um destino antes de gerar o roteiro.");
      return;
    }
    if (!form.startDate || !form.endDate || daysCount < 1) {
      setError("A data final deve ser igual ou posterior à data inicial.");
      return;
    }
    if (daysCount > 30) {
      setError("A viagem pode ter no máximo 30 dias (regra do sistema).");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const budgetAmount = totals.perPerson > 0 ? totals.perPerson : 0;

      if (!isAuthenticated) {
        const preview = await recommendationsService.preview({
          destination: form.destination.trim(),
          categoryIds: form.categoryIds,
          budget: totals.perPerson > 0 ? totals.perPerson : null,
          days: daysCount,
        });
        const recPlaces = Array.isArray(preview?.places) ? preview.places : [];
        const selectedPlaces = form.attractions.length
          ? approvedPlaces.filter((p) => form.attractions.includes(p.id))
          : recPlaces.map((r) => ({
              ...r.place,
              priceLabel: formatPlacePrice(r.place.price, r.place.estimatedCost),
            }));

        if (selectedPlaces.length === 0) {
          setError(preview?.message || "Nenhum local aprovado encontrado para este destino.");
          return;
        }

        const previewDays = [];
        const perDay = Math.min(3, Math.max(1, Math.ceil(selectedPlaces.length / daysCount)));
        let idx = 0;
        for (let d = 0; d < daysCount && idx < selectedPlaces.length; d++) {
          const slice = selectedPlaces.slice(idx, idx + perDay);
          idx += slice.length;
          const dateIso = addDaysIso(form.startDate, d);
          previewDays.push({
            day: d + 1,
            dateIso,
            dateLabel: `Dia ${d + 1} (${new Date(`${dateIso}T00:00:00`).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            })})`,
            items: slice.map((p) => ({
              locId: p.id,
              name: p.name,
              hours: p.businessHours,
              price: p.estimatedCost !== null && p.estimatedCost !== undefined ? Number(p.estimatedCost) : null,
              priceLabel: formatPlacePrice(p.price, p.estimatedCost),
              group: p.categoryName || "Cultural",
              city: p.city,
              state: p.state,
            })),
          });
        }

        setActiveTrip(null);
        setPersistedDays(previewDays);
        setIsPreviewMode(true);
        setRecommendationInfo(
          `${preview?.message || "Prévia calculada com locais reais."} Entre na sua conta para salvar este roteiro no banco de dados.`
        );
        setGenerated(true);
        setActiveDay(0);
        window.setTimeout(() => document.querySelector("#resultado")?.scrollIntoView({ behavior: "smooth" }), 50);
        return;
      }

      // Usuário autenticado: cria viagem + preferências + gera itinerário persistido no MySQL
      const createdTrip = await tripsService.create({
        destination: form.destination.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        budget: budgetAmount,
        categoryIds: form.categoryIds,
      });

      let items = [];
      try {
        items = await itinerariesService.generateForTrip(createdTrip.id, {
          placeIds: form.attractions.length ? form.attractions : null,
          maxPerDay: form.pace === "Intenso" ? 4 : form.pace === "Tranquilo" ? 2 : 3,
        });
      } catch (genErr) {
        // Evita viagem órfã sem roteiro caso nenhum local aprovado corresponda ao destino
        await tripsService.remove(createdTrip.id).catch(() => {});
        throw genErr;
      }

      setActiveTrip(createdTrip);
      setPersistedDays(groupDaysFromItems(Array.isArray(items) ? items : [], createdTrip.startDate, daysCount));
      setIsPreviewMode(false);
      setRecommendationInfo(`Viagem #${createdTrip.id} e roteiro salvos no banco de dados.`);
      setGenerated(true);
      setActiveDay(0);
      showToast("Viagem e roteiro salvos com sucesso!");
      await refreshSavedTrips();
      window.setTimeout(() => document.querySelector("#resultado")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (err) {
      setError(err.message || "Não foi possível gerar o roteiro.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initialState);
    setGenerated(false);
    setActiveTrip(null);
    setPersistedDays([]);
    setError("");
    setActiveDay(0);
  };

  const copySummary = async () => {
    const summary = `${form.destination} · ${form.days} dias (${form.startDate} a ${form.endDate})\n${persistedDays
      .map((day) => `${day.dateLabel}: ${day.items.map((item) => item.name).join(", ")}`)
      .join("\n")}`;
    try {
      await navigator.clipboard.writeText(summary);
      showToast("Resumo copiado.");
    } catch {
      showToast("Não foi possível copiar o resumo.");
    }
  };

  const promptLoginToSave = () => {
    openModal("entrar");
  };

  return {
    form,
    update,
    toggle,
    categories,
    approvedPlaces,
    filteredAttractions,
    availableCities,
    savedTrips,
    activeTrip,
    loadSavedTrip,
    loadingCatalog,
    submitting,
    generated,
    isPreviewMode,
    recommendationInfo,
    generate,
    reset,
    totals,
    groupCount,
    itinerary: persistedDays,
    activeDay,
    setActiveDay,
    error,
    toast,
    copySummary,
    promptLoginToSave,
  };
}
