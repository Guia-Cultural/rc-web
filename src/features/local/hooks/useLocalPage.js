import { useEffect, useMemo, useState } from "react";
import { places, residentTips, seededReviews, visitorRoutes } from "../data/localData";

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export default function useLocalPage() {
  const initialSlug = new URLSearchParams(window.location.search).get("local");
  const [slug, setSlug] = useState(places.some((place) => place.slug === initialSlug) ? initialSlug : places[0].slug);
  const [role, setRole] = useState("visitante");
  const [favorites, setFavorites] = useState(() => readStorage("rc-local-favorites", []));
  const [reviews, setReviews] = useState(() => readStorage("rc-local-reviews", seededReviews));
  const [tips, setTips] = useState(() => readStorage("rc-local-tips", residentTips));
  const [routes, setRoutes] = useState(() => readStorage("rc-local-routes", visitorRoutes));
  const [reports, setReports] = useState(() => readStorage("rc-local-reports", []));
  const [modal, setModal] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState("");
  const [reviewSort, setReviewSort] = useState("recentes");
  const [filters, setFilters] = useState({ query: "", state: "", price: "" });
  const [approved, setApproved] = useState(true);

  const place = places.find((item) => item.slug === slug) ?? places[0];
  const isFavorite = favorites.includes(slug);
  const visiblePlaces = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase("pt-BR");
    return places.filter((item) => {
      const matchesQuery = !query || `${item.name} ${item.location} ${item.category}`.toLocaleLowerCase("pt-BR").includes(query);
      const matchesState = !filters.state || item.location.endsWith(filters.state);
      const matchesPrice = !filters.price || (filters.price === "g" ? !item.paid : item.paid);
      return matchesQuery && matchesState && matchesPrice;
    });
  }, [filters]);

  const sortedReviews = useMemo(() => [...reviews].sort((a, b) => {
    if (reviewSort === "melhor") return b.rating - a.rating;
    if (reviewSort === "pior") return a.rating - b.rating;
    return String(b.id).localeCompare(String(a.id));
  }), [reviewSort, reviews]);

  useEffect(() => localStorage.setItem("rc-local-favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("rc-local-reviews", JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem("rc-local-tips", JSON.stringify(tips)), [tips]);
  useEffect(() => localStorage.setItem("rc-local-routes", JSON.stringify(routes)), [routes]);
  useEffect(() => localStorage.setItem("rc-local-reports", JSON.stringify(reports)), [reports]);
  useEffect(() => {
    document.title = `${place.name} – Rota Cultural`;
    const url = new URL(window.location.href);
    url.searchParams.set("local", slug);
    window.history.replaceState({}, "", url);
  }, [place.name, slug]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const choosePlace = (nextSlug) => {
    setSlug(nextSlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = () => {
    setFavorites((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
    setToast(isFavorite ? "Local removido dos favoritos." : "Local salvo nos favoritos.");
  };

  const share = async () => {
    const data = { title: place.name, text: place.tag, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(`${data.title} — ${data.url}`);
      setToast("Link pronto para compartilhar.");
    } catch (error) {
      if (error?.name !== "AbortError") setToast("Não foi possível compartilhar agora.");
    }
  };

  const addReview = ({ rating, text }) => {
    setReviews((current) => [...current, { id: `r-${Date.now()}`, author: role === "admin" ? "Admin Demo" : "Visitante Demo", rating, text, date: "Agora" }]);
    setToast("Avaliação publicada localmente.");
  };
  const addTip = ({ author, text }) => {
    setTips((current) => [{ id: `f-${Date.now()}`, author, role: "Morador(a)", text }, ...current]);
    setModal(null);
    setToast("Dica publicada localmente.");
  };
  const addRoute = (route) => {
    setRoutes((current) => [{ ...route, id: `v-${Date.now()}`, author: "Visitante Demo", likes: 0 }, ...current]);
    setModal(null);
    setToast("Roteiro demonstrativo criado.");
  };
  const addReport = (report) => {
    setReports((current) => [{ ...report, id: `p-${Date.now()}`, resolved: false }, ...current]);
    setModal(null);
    setToast("Denúncia guardada apenas neste navegador.");
  };
  const completeDemo = (message) => {
    setModal(null);
    setToast(message);
  };

  return {
    place, role, setRole, isFavorite, toggleFavorite, share, choosePlace,
    reviews: sortedReviews, reviewSort, setReviewSort, addReview,
    tips, addTip, routes, addRoute, reports, addReport,
    modal, setModal, lightbox, setLightbox, toast, completeDemo,
    filters, setFilters, visiblePlaces, approved, setApproved,
  };
}
