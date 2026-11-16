import { HOME_IMAGES as IMG } from "../data/homeData.js";
import { resolveAssetUrl } from "../../../services/apiClient";

const CATEGORY_VISUALS = [
  { key: "Praias", color: "#7BE0F2", icon: "wave", title: "Paraísos Tropicais", sub: "Sol, mar e paisagens inesquecíveis.", img: "card-praias", dark: "#00B8D9", contrast: "#0891B2", accent: "#00B8D9" },
  { key: "História", color: "#FFC107", icon: "landmark", title: "Riqueza Cultural", sub: "História, arte e tradição em cada esquina.", img: "stairs", dark: "#FF6B00", contrast: "#EA580C", accent: "#FFC107" },
  { key: "Cidades", color: "#9DB8FF", icon: "building", title: "Grandes Metrópoles", sub: "Cultura, gastronomia e novas experiências.", img: "card-cidades", dark: "#5B4BFF", contrast: "#5B3DF5", accent: "#6B7CFF" },
  { key: "Natureza", color: "#6BDDA0", icon: "mountain", title: "Aventuras Naturais", sub: "Paisagens que renovam a alma.", img: "macaw", dark: "#12B76A", contrast: "#15803D", accent: "#22C55E" },
  { key: "Aventura", color: "#FF9A6B", icon: "compass", title: "Viva o Extraordinário", sub: "Para quem busca emoção e liberdade.", img: "surf", dark: "#E8222B", contrast: "#DC2626", accent: "#FF6B3D" },
];

function findCategoryVisual(categoryName = "") {
  const norm = categoryName.toLowerCase();
  if (norm.includes("praia")) return CATEGORY_VISUALS[0];
  if (norm.includes("hist") || norm.includes("arte") || norm.includes("museu")) return CATEGORY_VISUALS[1];
  if (norm.includes("urb") || norm.includes("gastr") || norm.includes("cidad")) return CATEGORY_VISUALS[2];
  if (norm.includes("natur") || norm.includes("eco")) return CATEGORY_VISUALS[3];
  if (norm.includes("avent") || norm.includes("trilha")) return CATEGORY_VISUALS[4];
  return CATEGORY_VISUALS[1];
}

function getPlaceImage(place) {
  if (place?.coverImage) {
    return resolveAssetUrl(place.coverImage);
  }
  const visual = findCategoryVisual(place?.categoryName || "");
  return IMG[visual.img];
}

function formatPriceLabel(price, estimatedCost) {
  if (price === "GRATUITO") return "Gratuito";
  if (estimatedCost !== null && estimatedCost !== undefined && Number(estimatedCost) > 0) {
    return `R$ ${Number(estimatedCost).toFixed(0)}`;
  }
  if (price === "BARATO") return "Econômico";
  if (price === "MODERADO") return "Moderado";
  if (price === "CARO") return "Confortável";
  return "Pago";
}

function normalizeStr(s = "") {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function initializeHomeInteractions({
  user,
  openModal,
  navigate,
  apiPlaces = [],
  apiCategories = [],
  placesLoading = false,
  placesError = "",
  favoriteIds = [],
  onToggleFavorite,
  onRecommend,
}) {
  const cleanups = [];
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const ico = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const esc = (s = "") =>
    String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

  $$("img[data-i]").forEach((i) => {
    if (IMG[i.dataset.i]) i.src = IMG[i.dataset.i];
  });
  $$("img[data-as]").forEach((i) => {
    if (IMG[i.dataset.as]) i.src = IMG[i.dataset.as];
  });

  const showToast = (message) => {
    const t = $("#gtoast");
    if (!t) return;
    t.textContent = message;
    t.classList.add("rc-toast--visible");
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => t.classList.remove("rc-toast--visible"), 2800);
  };

  const dlg = $("#dlg");
  const dbody = dlg?.querySelector(".rc-dialog__body");
  function showDialog(html, wide) {
    if (!dlg || !dbody) return;
    dbody.innerHTML = html;
    dlg.classList.toggle("rc-dialog--wide", !!wide);
    dbody.classList.toggle("rc-dialog__body--wide", !!wide);
    if (!dlg.open) dlg.showModal();
  }

  let ti = 0;
  let tt = null;
  const TOUR = [
    ["x-rio", "Rio de Janeiro, RJ", "Uma baía que parece pintura"],
    ["hero-praias", "Litoral brasileiro", "Mar azul e areia clara"],
    ["x-fall", "Chapada Diamantina, BA", "Cachoeiras no meio da mata"],
    ["x-colonial", "Paraty, RJ", "Ruas de pedra e casario colonial"],
    ["hero-montanhas", "Serra da Mantiqueira", "Montanhas ao amanhecer"],
  ];

  function tshow(i) {
    ti = (i + TOUR.length) % TOUR.length;
    const s = TOUR[ti];
    const tImg = $("#tImg");
    const tT = $("#tT");
    const tS = $("#tS");
    if (!tImg) return;
    tImg.src = IMG[s[0]];
    if (tT) tT.textContent = s[1];
    if (tS) tS.textContent = s[2];
    $$(".momentos__tour-progress-item").forEach((b, k) => {
      b.className =
        "momentos__tour-progress-item" +
        (k < ti
          ? " momentos__tour-progress-item--complete"
          : k === ti
            ? " momentos__tour-progress-item--active"
            : "");
    });
    window.clearTimeout(tt);
    tt = window.setTimeout(() => tshow(ti + 1), 3400);
  }

  if (dlg) {
    const onDlgClick = (e) => {
      if (e.target === dlg || e.target.closest("[data-close]")) {
        dlg.close();
        return;
      }
      const ts = e.target.closest("[data-ts]");
      if (ts) {
        tshow(ti + Number(ts.dataset.ts));
        return;
      }
      const goPlace = e.target.closest("[data-go-place]");
      if (goPlace) {
        dlg.close();
        navigate(`/local/${goPlace.dataset.goPlace}`);
        return;
      }
      const goRoteiro = e.target.closest("[data-go-roteiro]");
      if (goRoteiro) {
        dlg.close();
        navigate(`/roteiros?destino=${encodeURIComponent(goRoteiro.dataset.goRoteiro)}`);
      }
    };
    const onDlgClose = () => window.clearTimeout(tt);
    dlg.addEventListener("click", onDlgClick);
    dlg.addEventListener("close", onDlgClose);
    cleanups.push(() => {
      dlg.removeEventListener("click", onDlgClick);
      dlg.removeEventListener("close", onDlgClose);
      window.clearTimeout(tt);
    });
  }

  // Click delegation for auth / institutional links on Home
  const onDocClick = (e) => {
    const authEl = e.target.closest("[data-auth]");
    if (authEl) {
      e.preventDefault();
      openModal(authEl.dataset.auth === "login" ? "entrar" : "cadastrar");
      return;
    }
    const dlgBtn = e.target.closest("[data-dlg]");
    if (dlgBtn) {
      e.preventDefault();
      const map = { contact: "contato", faq: "faq", help: "ajuda", terms: "termos" };
      openModal(map[dlgBtn.dataset.dlg] || "contato");
      return;
    }
    if (e.target.id === "pagain") {
      $("#pcard")?.classList.remove("recomendacao__card--completed");
    }
  };
  document.addEventListener("click", onDocClick);
  cleanups.push(() => document.removeEventListener("click", onDocClick));

  // Blog teaser section
  const btCtas = $("#btCtas");
  if (btCtas) {
    btCtas.innerHTML = user
      ? `<button type="button" class="button" id="btGoCommunity">Ir para a comunidade <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></button>`
      : '<button type="button" class="button" data-auth="register">Criar conta grátis <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></button><button type="button" class="button button--ghost" data-auth="login">Já tenho conta</button>';
    const goComm = $("#btGoCommunity");
    if (goComm) {
      goComm.onclick = () => navigate("/comunidade");
    }
  }
  $$(".blog__access-gate .button").forEach((b) => {
    b.textContent = user ? "Abrir a comunidade" : "Entrar na comunidade";
    b.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (user) navigate("/comunidade");
      else openModal("entrar");
    };
  });

  const CT = ["Históricas", "Natureza", "Praias", "Cidades", "Aventura"];
  const CI = { Históricas: "x-church", Natureza: "x-fall", Praias: "card-praias", Cidades: "x-rio", Aventura: "surf" };
  const TP = [
    ["Lucas Silva", "Históricas", "Três horas no centro histórico sem gastar nada", "Roteiro demonstrativo a pé por igrejas, praças e casarões.", 41, 2],
    ["Bruno Martins", "Históricas", "O museu pequeno que roubou a cena", "Relato demonstrativo de visita cultural no fim de semana.", 18, 4],
    ["Camila Ribeiro", "Natureza", "Primeira vez em uma trilha: o que levar", "Dicas demonstrativas de preparação para trilhas leves.", 33, 5],
    ["Juliana Prado", "Natureza", "Amanhecer no lago vale acordar às 5h", "História demonstrativa de viagem em contato com a natureza.", 19, 3],
    ["Lucas Almeida", "Praias", "Praia tranquila fora da temporada", "Relato demonstrativo sobre litoral brasileiro.", 12, 1],
    ["Rafael Souza", "Cidades", "Programas gratuitos para o fim de semana", "Sugestões demonstrativas de passeios urbanos.", 24, 6],
    ["Pedro Lima", "Aventura", "Tirolesa na mata: vale o frio na barriga", "Dicas demonstrativas de aventura ao ar livre.", 27, 7],
  ];
  let blogCat = "Todos";
  const chips = $("#btChips");
  const stack = $("#btStack");
  if (chips && stack) {
    chips.innerHTML = ["Todos", ...CT]
      .map((c) => `<button type="button" data-c="${c}" aria-pressed="${c === blogCat}">${c}</button>`)
      .join("");
    const renderBlogFeed = () => {
      chips.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.c === blogCat));
      const l = blogCat === "Todos" ? [...TP].sort((a, b) => b[4] - a[4]) : TP.filter((p) => p[1] === blogCat);
      const sh = l.slice(0, 2);
      const lk = TP.filter((p) => !sh.includes(p))[0] || TP[2];
      stack.innerHTML = [...sh, lk]
        .map(
          (p, i) => `
          <article class="blog__post-card${i === 2 ? " blog__post-card--locked" : ""}" style="--blog-delay:${i * 0.09}s" data-gate="Entre para acessar a comunidade.">
            <div class="blog__post-image"><img src="${IMG[CI[p[1]]]}" alt="" loading="lazy"><span class="blog__post-tag">${p[1]} (Exemplo)</span></div>
            <div class="blog__post-content">
              <div class="blog__post-author"><span class="blog__author-avatar">${p[0][0]}</span>${p[0]}</div>
              <h4 class="blog__post-title">${esc(p[2])}</h4>
              <p class="blog__post-excerpt">${esc(p[3])}</p>
              <div class="blog__post-actions">
                <button type="button" data-gate="Entre para curtir">${ico("heart")} ${p[4]}</button>
                <button type="button" data-gate="Entre para comentar">${ico("chat")} ${p[5]}</button>
                <button type="button" data-gate="Entre para abrir">${ico("share")}</button>
              </div>
            </div>
          </article>`
        )
        .join("");
    };
    chips.onclick = (e) => {
      const b = e.target.closest("[data-c]");
      if (b) {
        blogCat = b.dataset.c;
        renderBlogFeed();
      }
    };
    stack.onclick = (e) => {
      const g = e.target.closest("[data-gate]");
      if (!g) return;
      e.stopPropagation();
      if (user) navigate("/comunidade");
      else openModal("entrar");
    };
    renderBlogFeed();
  }

  const LV = [
    "Comunidade Rota Cultural (conteúdo demonstrativo do MVP)",
    "Explore locais reais aprovados na seção Destinos abaixo",
    "Monte seu roteiro personalizado com dados reais em /roteiros",
  ];
  const lv = $("#btLive");
  if (lv) {
    let li = 0;
    const tick = () => {
      lv.style.opacity = 0;
      window.setTimeout(() => {
        lv.textContent = LV[li++ % LV.length];
        lv.style.opacity = 1;
      }, 250);
    };
    tick();
    const lvTimer = window.setInterval(tick, 4000);
    cleanups.push(() => window.clearInterval(lvTimer));
  }

  // Hero theme rotator (linked to real places when available)
  const hero = $("#inicio");
  const themesEl = $("#themes");
  const HERO_THEMES = [
    { key: "Praias", img: "hero-praias", sub: "Sol, mar e paisagens inesquecíveis. Descubra o litoral brasileiro.", cityHint: "Paraty" },
    { key: "História", img: "x-church", sub: "Ladeiras, igrejas e museus que contam a história do Brasil em cada esquina.", cityHint: "Ouro Preto" },
    { key: "Cidades", img: "hero-cidades", sub: "Cultura, gastronomia e novas experiências nas grandes metrópoles.", cityHint: "São Paulo" },
    { key: "Natureza", img: "hero-natureza", sub: "Parques, trilhas e paisagens que renovam a alma.", cityHint: "São Paulo" },
    { key: "Aventura", img: "surf", sub: "Emoção e liberdade para quem quer viver o extraordinário.", cityHint: "Rio de Janeiro" },
  ];

  if (hero && themesEl) {
    themesEl.querySelectorAll(".hero__theme").forEach((el) => el.remove());
    HERO_THEMES.forEach((ht, i) => {
      const visual = CATEGORY_VISUALS[i];
      themesEl.insertAdjacentHTML(
        "beforeend",
        `<button type="button" class="hero__theme" data-t="${i}" aria-pressed="${i === 0}" style="--hero-theme-accent:${visual.dark}">${ico(visual.icon)}${ht.key}</button>`
      );
    });

    let hi = 0;
    let hOn = 1;
    let hAuto = true;
    let hTimer = null;

    const findHighlightPlace = (ht) => {
      if (!apiPlaces.length) return null;
      return (
        apiPlaces.find((p) => normalizeStr(p.categoryName).includes(normalizeStr(ht.key).slice(0, 4))) ||
        apiPlaces.find((p) => normalizeStr(p.city).includes(normalizeStr(ht.cityHint))) ||
        apiPlaces[0]
      );
    };

    const applyTheme = (i, manual) => {
      hi = i;
      const ht = HERO_THEMES[i];
      const visual = CATEGORY_VISUALS[i];
      const featured = findHighlightPlace(ht);

      hero.style.setProperty("--hero-theme-color", visual.dark);
      hero.style.setProperty("--hero-theme-text", visual.contrast);
      $$(".hero__theme").forEach((b, k) => b.setAttribute("aria-pressed", k === i));

      const sub = $("#hsub");
      if (sub) {
        sub.style.opacity = 0;
        window.setTimeout(() => {
          sub.textContent = ht.sub;
          sub.style.opacity = 1;
        }, 180);
      }

      const a = $("#hi" + hOn);
      const b = $("#hi" + (3 - hOn));
      if (a && b) {
        b.src = featured?.coverImage ? resolveAssetUrl(featured.coverImage) : IMG[ht.img];
        b.classList.remove("hero__image--inactive");
        b.classList.add("hero__image--active");
        a.classList.add("hero__image--inactive");
        a.classList.remove("hero__image--active");
        hOn = 3 - hOn;
      }

      if ($("#hn")) $("#hn").textContent = featured ? featured.name : "Rota Cultural";
      if ($("#hc")) $("#hc").textContent = featured ? `${featured.city}, ${featured.state}` : "Brasil";
      if ($("#hct")) {
        $("#hct").textContent = featured?.categoryName || ht.key;
        $("#hct").style.background = visual.dark;
      }
      if ($("#hcap")) {
        $("#hcap").dataset.placeId = featured ? String(featured.id) : "";
      }

      $$("#hseg i").forEach((s, k) => {
        s.className = k < i ? "hero__segment--complete" : k === i ? "hero__segment--active" : "";
      });
      if ($("#hseg")) $("#hseg").classList.toggle("hero__segments--manual", !hAuto || !!manual);
      if (manual) {
        hAuto = false;
        window.clearInterval(hTimer);
      }
    };

    themesEl.onclick = (e) => {
      const b = e.target.closest("[data-t]");
      if (b) applyTheme(Number(b.dataset.t), true);
    };
    hTimer = window.setInterval(() => {
      if (hAuto) applyTheme((hi + 1) % HERO_THEMES.length, false);
    }, 6500);
    cleanups.push(() => window.clearInterval(hTimer));

    const hcap = $("#hcap");
    if (hcap) {
      const openHeroPlace = () => {
        const pid = hcap.dataset.placeId;
        if (pid) navigate(`/local/${pid}`);
        else navigate("/explorar");
      };
      hcap.onclick = openHeroPlace;
      hcap.onkeydown = (e) => {
        if (e.key === "Enter") openHeroPlace();
      };
    }

    const hs = $("#hs");
    if (hs) {
      hs.onsubmit = (e) => {
        e.preventDefault();
        const q = $("#hq")?.value?.trim() || "";
        if ($("#pq")) $("#pq").value = q;
        filterState.q = q;
        filterState.n = 8;
        renderPlacesList();
        $("#locais")?.scrollIntoView({ behavior: "smooth" });
        showToast(q ? `Buscando por “${q}”` : "Mostrando todos os locais aprovados");
      };
    }
    applyTheme(0, false);
  }

  // Destinos / Explorar Section driven by real backend places & categories
  const filterState = { catId: null, q: "", uf: "", price: "all", n: 8 };
  const catsEl = $("#cats");
  const pufEl = $("#puf");
  const pgridEl = $("#pgrid");
  const pcountEl = $("#pcount");
  const pmoreEl = $("#pmore");

  if (catsEl) {
    const cardsToRender = apiCategories.length
      ? apiCategories.map((cat) => ({ id: cat.id, name: cat.name, visual: findCategoryVisual(cat.name) }))
      : CATEGORY_VISUALS.map((v, idx) => ({ id: null, name: v.key, visual: CATEGORY_VISUALS[idx] }));

    catsEl.innerHTML = cardsToRender
      .map(
        ({ id, name, visual }) => `
        <button type="button" class="destinos__category reveal reveal--visible"
          style="--destinos-card-color:${visual.color};--destinos-accent:${visual.accent};--destinos-rotation:${name.length % 2 ? "3deg" : "-3deg"}"
          data-cat-id="${id ?? ""}" data-cat-name="${esc(name)}" aria-pressed="false">
          <span class="destinos__image"><img src="${IMG[visual.img]}" alt="${esc(name)}"></span>
          <span class="destinos__tag">${ico(visual.icon)}${esc(name)}</span>
          <span class="destinos__copy"><b>${esc(visual.title)}</b><small>${esc(visual.sub)}</small></span>
          <span class="destinos__action"><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </button>`
      )
      .join("");
  }

  if (pufEl) {
    const ufs = [...new Set(apiPlaces.map((p) => p.state).filter(Boolean))].sort();
    pufEl.innerHTML = '<option value="">Todos os estados</option>' + ufs.map((u) => `<option value="${esc(u)}">${esc(u)}</option>`).join("");
  }

  function renderPlacesList() {
    if (!pgridEl || !pcountEl) return;

    $$(".destinos__category").forEach((b) => {
      const isMatch = filterState.catId && String(b.dataset.catId) === String(filterState.catId);
      b.setAttribute("aria-pressed", String(Boolean(isMatch)));
    });
    $$("#pp button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === filterState.price)));

    if (placesLoading) {
      pcountEl.textContent = "Carregando locais culturais do servidor...";
      pgridEl.innerHTML = '<div class="destinos__empty"><h3>Carregando locais...</h3><p>Buscando locais aprovados no banco de dados.</p></div>';
      if (pmoreEl) pmoreEl.hidden = true;
      return;
    }

    if (placesError) {
      pcountEl.textContent = "Não foi possível carregar os locais.";
      pgridEl.innerHTML = `<div class="destinos__empty"><h3>Erro ao carregar locais</h3><p>${esc(placesError)}</p></div>`;
      if (pmoreEl) pmoreEl.hidden = true;
      return;
    }

    const qNorm = normalizeStr(filterState.q);
    const filtered = apiPlaces.filter((p) => {
      if (filterState.catId && String(p.catId) !== String(filterState.catId)) return false;
      if (filterState.uf && p.state !== filterState.uf) return false;
      if (filterState.price === "free" && p.price !== "GRATUITO") return false;
      if (filterState.price === "paid" && p.price === "GRATUITO") return false;
      if (qNorm) {
        const hay = normalizeStr(`${p.name} ${p.city} ${p.state} ${p.categoryName || ""} ${p.description || ""}`);
        if (!hay.includes(qNorm)) return false;
      }
      return true;
    });

    pcountEl.textContent = `${filtered.length} ${filtered.length === 1 ? "local encontrado" : "locais encontrados"}`;

    if (!filtered.length) {
      pgridEl.innerHTML =
        '<div class="destinos__empty"><h3>Nenhum local encontrado</h3><p>Tente outra categoria ou limpe os filtros.</p><button type="button" class="button" id="pEmptyClr">Limpar filtros</button></div>';
      const clr = $("#pEmptyClr");
      if (clr) {
        clr.onclick = () => resetFilters();
      }
      if (pmoreEl) pmoreEl.hidden = true;
      return;
    }

    pgridEl.innerHTML = filtered
      .slice(0, filterState.n)
      .map((p, k) => {
        const visual = findCategoryVisual(p.categoryName || "");
        const isFav = favoriteIds.includes(p.id);
        const isPaid = p.price !== "GRATUITO";
        return `
          <article class="destinos__place-card" style="--destinos-delay:${(k % 4) * 0.07}s">
            <div class="destinos__image" data-place-id="${p.id}">
              <img src="${getPlaceImage(p)}" alt="${esc(p.name)}" loading="lazy">
              <span class="destinos__price ${isPaid ? "destinos__price--paid" : ""}">${esc(formatPriceLabel(p.price, p.estimatedCost))}</span>
              <button type="button" class="destinos__favorite" data-fav-id="${p.id}" aria-pressed="${isFav}" aria-label="Favoritar ${esc(p.name)}">${ico("heart")}</button>
            </div>
            <div class="destinos__place-content">
              <span class="destinos__place-category" style="--destinos-card-color:${visual.color}">${ico(visual.icon)}${esc(p.categoryName || "Cultural")}</span>
              <h4 class="destinos__place-title" data-place-id="${p.id}">${esc(p.name)}</h4>
              <span class="destinos__place-location">${ico("pin")}${esc(p.city)}, ${esc(p.state)}</span>
              <button type="button" class="button button--ghost" data-place-id="${p.id}">Ver detalhes</button>
            </div>
          </article>`;
      })
      .join("");

    if (pmoreEl) {
      pmoreEl.hidden = filtered.length <= filterState.n;
    }
  }

  function resetFilters() {
    Object.assign(filterState, { catId: null, q: "", uf: "", price: "all", n: 8 });
    if ($("#pq")) $("#pq").value = "";
    if ($("#puf")) $("#puf").value = "";
    renderPlacesList();
  }

  if (catsEl) {
    catsEl.onclick = (e) => {
      const b = e.target.closest("[data-cat-id]");
      if (!b) return;
      const cid = b.dataset.catId || null;
      filterState.catId = filterState.catId === cid ? null : cid;
      filterState.n = 8;
      renderPlacesList();
      if (filterState.catId) $("#locais")?.scrollIntoView({ behavior: "smooth" });
    };
  }
  if ($("#pq")) {
    $("#pq").oninput = (e) => {
      filterState.q = e.target.value.trim();
      filterState.n = 8;
      renderPlacesList();
    };
  }
  if (pufEl) {
    pufEl.onchange = (e) => {
      filterState.uf = e.target.value;
      filterState.n = 8;
      renderPlacesList();
    };
  }
  if ($("#pp")) {
    $("#pp").onclick = (e) => {
      const b = e.target.closest("[data-v]");
      if (b) {
        filterState.price = b.dataset.v;
        filterState.n = 8;
        renderPlacesList();
      }
    };
  }
  if ($("#pclr")) $("#pclr").onclick = resetFilters;
  if ($("#pmore button")) {
    $("#pmore button").onclick = () => {
      filterState.n += 4;
      renderPlacesList();
    };
  }

  if (pgridEl) {
    pgridEl.onclick = async (e) => {
      const favBtn = e.target.closest("[data-fav-id]");
      if (favBtn) {
        e.stopPropagation();
        const placeId = Number(favBtn.dataset.favId);
        if (onToggleFavorite) {
          await onToggleFavorite(placeId, showToast);
        }
        return;
      }
      const detailTrigger = e.target.closest("[data-place-id]");
      if (detailTrigger) {
        const pid = Number(detailTrigger.dataset.placeId);
        const place = apiPlaces.find((item) => item.id === pid);
        if (!place) return;
        const visual = findCategoryVisual(place.categoryName || "");
        const isPaid = place.price !== "GRATUITO";
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${place.city} ${place.state}`)}`;
        showDialog(
          `<div class="destinos__detail-modal">
            <div class="destinos__detail-image">
              <img src="${getPlaceImage(place)}" alt="${esc(place.name)}">
              <span class="destinos__price ${isPaid ? "destinos__price--paid" : ""}">${esc(formatPriceLabel(place.price, place.estimatedCost))}</span>
            </div>
            <div class="destinos__detail-body">
              <span class="destinos__place-category" style="--destinos-card-color:${visual.color}">${ico(visual.icon)}${esc(place.categoryName || "Cultural")}</span>
              <h2 class="destinos__detail-title">${esc(place.name)}</h2>
              <p class="destinos__place-location">${ico("pin")}${esc(place.address)} — ${esc(place.city)}, ${esc(place.state)}</p>
              <p>${esc(place.description)}</p>
              <ul class="destinos__detail-list">
                <li><b>Entrada</b>${esc(formatPriceLabel(place.price, place.estimatedCost))}</li>
                <li><b>Funcionamento</b>${esc(place.businessHours)}</li>
                <li><b>Avaliação</b>${place.reviewCount ? `${place.averageRating} ★ (${place.reviewCount} avaliações)` : "Ainda sem avaliações"}</li>
              </ul>
              <div class="destinos__detail-actions">
                <button type="button" class="button" data-go-place="${place.id}">${ico("arrow")}Ver página do local</button>
                <button type="button" class="button button--ghost" data-go-roteiro="${esc(place.city)}">${ico("map")}Planejar roteiro</button>
                <a class="button button--ghost" href="${mapsUrl}" target="_blank" rel="noopener">Mapa</a>
              </div>
            </div>
          </div>`,
          true
        );
      }
    };
  }

  renderPlacesList();

  // Tour Modal
  if ($("#vid")) {
    $("#vid").onclick = () => {
      showDialog(
        `<div class="momentos__tour-modal">
          <div class="momentos__tour-progress">${TOUR.map(() => '<span class="momentos__tour-progress-item"><i></i></span>').join("")}</div>
          <img id="tImg" alt="">
          <div class="momentos__tour-caption"><b id="tT"></b><span id="tS"></span></div>
          <button type="button" class="momentos__tour-navigation" data-ts="-1" aria-label="Anterior">‹</button>
          <button type="button" class="momentos__tour-navigation momentos__tour-navigation--next" data-ts="1" aria-label="Próximo">›</button>
        </div>`,
        true
      );
      tshow(0);
    };
  }

  // Recommendation form connected to backend /recommendations/preview
  const pch = $("#pch");
  const pickedCatIds = new Set();
  if (pch) {
    const recCats = apiCategories.length ? apiCategories : [];
    pch.innerHTML = recCats
      .map((c) => {
        const visual = findCategoryVisual(c.name);
        return `<button type="button" data-cat-pick="${c.id}" style="--recomendacao-accent:${visual.color}" aria-pressed="false">${ico(visual.icon)}${esc(c.name)}</button>`;
      })
      .join("");
    pch.onclick = (e) => {
      const b = e.target.closest("[data-cat-pick]");
      if (!b) return;
      const id = Number(b.dataset.catPick);
      if (pickedCatIds.has(id)) pickedCatIds.delete(id);
      else pickedCatIds.add(id);
      b.setAttribute("aria-pressed", String(pickedCatIds.has(id)));
    };
  }

  if (user) {
    if ($("#pn")) $("#pn").value = user.name || "";
    if ($("#pe")) $("#pe").value = user.email || "";
  }

  const pf = $("#pf");
  if (pf) {
    pf.onsubmit = async (e) => {
      e.preventDefault();
      const name = ($("#pn")?.value || "").trim();
      const email = ($("#pe")?.value || "").trim();
      const budMode = $("#pbud")?.value || "any";
      const dest = ($("#ploc")?.value || "").trim();
      const errEl = $("#perr");
      const presEl = $("#pres");

      if (name.length < 2) {
        if (errEl) errEl.textContent = "Informe seu nome.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (errEl) errEl.textContent = "Informe um e-mail válido.";
        return;
      }
      if (errEl) errEl.textContent = "";

      const budgetMap = { any: null, free: 0, eco: 100, mid: 300, prem: 1000 };
      try {
        const resp = await onRecommend({
          destination: dest || null,
          categoryIds: [...pickedCatIds],
          budget: budgetMap[budMode],
          days: 3,
        });
        const items = (resp?.places || []).slice(0, 3);
        if (presEl) {
          presEl.innerHTML = `
            <div class="recomendacao__success-icon">✓</div>
            <h3 class="recomendacao__result-title">${esc(name.split(" ")[0])}, aqui estão suas recomendações</h3>
            <p class="rc-dialog__subtitle" style="margin:.2rem 0 .8rem">${esc(resp?.message || "")}</p>
            ${
              items.length
                ? items
                    .map(
                      (item, k) => `
                  <div class="recomendacao__result-card" style="--recomendacao-delay:${k * 0.12}s;cursor:pointer" data-rec-place="${item.place.id}">
                    <img src="${getPlaceImage(item.place)}" alt="">
                    <span><b>${esc(item.place.name)}</b><small>${esc(item.place.city)}, ${esc(item.place.state)} · ${esc(formatPriceLabel(item.place.price, item.place.estimatedCost))}</small></span>
                    <span class="recomendacao__score">${item.score} pts</span>
                  </div>`
                    )
                    .join("")
                : `<p class="rc-dialog__subtitle">Nenhum local aprovado correspondeu exatamente aos filtros informados.</p>`
            }
            <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem">
              <button type="button" class="button button--blue" id="recGoExplore">Explorar todos os locais ${ico("arrow")}</button>
              <button type="button" class="button button--ghost" id="pagain">Refazer busca</button>
            </div>`;
          presEl.querySelectorAll("[data-rec-place]").forEach((card) => {
            card.onclick = () => navigate(`/local/${card.dataset.recPlace}`);
          });
          const exploreBtn = $("#recGoExplore");
          if (exploreBtn) exploreBtn.onclick = () => navigate("/explorar");
        }
        $("#pcard")?.classList.add("recomendacao__card--completed");
      } catch (err) {
        if (errEl) errEl.textContent = err.message || "Erro ao consultar recomendações.";
      }
    };
  }

  // Stats, reveal animations, trail & marquees
  const nio = new IntersectionObserver(
    (es) =>
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        nio.unobserve(en.target);
        en.target.querySelectorAll("[data-count]").forEach((el) => {
          const to = Number(el.dataset.count);
          const t0 = performance.now();
          const st = (t) => {
            const k = Math.min(1, (t - t0) / 1400);
            el.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(1).replace(".", ",") + (el.dataset.suf || "");
            if (k < 1) requestAnimationFrame(st);
          };
          requestAnimationFrame(st);
        });
      }),
    { threshold: 0.35 }
  );
  $$("#stats").forEach((el) => nio.observe(el));

  const rio = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal--visible");
        if (entry.target.matches(".sobre-nos__banner")) {
          entry.target.classList.add("sobre-nos__banner--visible");
        }
        rio.unobserve(entry.target);
      }),
    { threshold: 0.1 }
  );
  $$(".reveal,.sobre-nos__checklist,.sobre-nos__banner").forEach((el) => rio.observe(el));
  cleanups.push(() => {
    nio.disconnect();
    rio.disconnect();
  });

  if (!document.getElementById("rc-home-extra-sprite")) {
    const sp = `<svg id="rc-home-extra-sprite" style="display:none"><symbol id="h-bed" viewBox="0 0 24 24"><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/></symbol><symbol id="h-fork" viewBox="0 0 24 24"><path d="M6 3v8a2 2 0 0 0 2 2v8M10 3v8M6 7h4M17 21V3c-2 1-3.5 4-3.5 8 0 1.5 1 2.5 3.5 2.5"/></symbol><symbol id="h-bus" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16M8 21v-4M16 21v-4"/></symbol><symbol id="h-bulb" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></symbol><symbol id="h-foot" viewBox="0 0 24 24"><ellipse cx="12" cy="16" rx="4.5" ry="6" fill="currentColor" stroke="none"/><circle cx="7.5" cy="7.5" r="1.6" fill="currentColor" stroke="none"/><circle cx="11" cy="5.5" r="1.6" fill="currentColor" stroke="none"/><circle cx="14.5" cy="5.5" r="1.6" fill="currentColor" stroke="none"/><circle cx="17.5" cy="7.8" r="1.5" fill="currentColor" stroke="none"/></symbol></svg>`;
    document.body.insertAdjacentHTML("afterbegin", sp);
  }

  const trailEl = $("#trail");
  if (trailEl) {
    const PN = [
      ["Onde ficar", "Hospedagem e a região certa para dormir.", ["Hotel", "Pousada", "Hostel", "Região"], "x-colonial"],
      ["Onde comer", "Gastronomia do café da manhã à janta.", ["Comida local", "Comida de rua", "Cafés", "Bares"], "vendor"],
      ["Onde ir", "Atrações e experiências, grátis ou pagas.", ["Pontos turísticos", "Passeios", "Shows", "Vida noturna"], "x-hiker"],
      ["Deslocamento", "Como ir de um ponto ao outro.", ["A pé", "Metrô", "Ônibus", "Carro"], "boat"],
      ["Dicas de viajante", "Época, documentos, segurança e boas práticas.", ["Melhor época", "Documentos", "Segurança", "Dicas"], "stairs"],
    ];
    const CK = ["#FFC107", "#FF6B00", "#12A5F0", "#12B76A", "#E91E8C"];
    const KT = ["#B98600", "#D95700", "#0C86C8", "#0A8A4F", "#C2187A"];
    const KEY = ["sleep", "food", "places", "transport", "finish"];
    const crumbs = (n) =>
      Array.from({ length: n }, (_, i) => `<i style="--roteiros-x:${8 + i * 9}%;--roteiros-y:${(i % 3) * 22 + 12}px;--roteiros-size:${6 + ((i * 7) % 7)}px;--roteiros-delay:${i * 0.12}s"></i>`).join("");
    const DECO = {
      sleep: '<svg class="roteiros__moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor"/></svg><b class="roteiros__sleep-letter">z</b><b class="roteiros__sleep-letter roteiros__sleep-letter--two">z</b><b class="roteiros__sleep-letter roteiros__sleep-letter--three">Z</b>',
      food: crumbs(9),
      places: [0, 1, 2, 3].map((i) => `<svg class="roteiros__compass" viewBox="0 0 24 24" style="--roteiros-x:${8 + i * 20}%;--roteiros-size:${46 - i * 8}px;--roteiros-delay:${i * 0.2}s"><use href="#i-compass"/></svg>`).join(""),
      transport: Array.from({ length: 6 }, (_, i) => `<svg class="roteiros__footstep" viewBox="0 0 24 24" style="--roteiros-x:${6 + i * 15}%;--roteiros-y:${i % 2 ? 34 : 6}px;--roteiros-delay:${i * 0.18}s"><use href="#h-foot"/></svg>`).join(""),
      finish: '<svg class="roteiros__finish-flag" viewBox="0 0 24 24"><use href="#i-pin"/></svg><span class="roteiros__finish-label">Ponto final</span>',
    };
    trailEl.innerHTML =
      '<i class="roteiros__line"></i><i class="roteiros__progress" id="trFill"></i><svg class="roteiros__plane" id="trPlane" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-plane"/></svg>' +
      PN.map(
        (p, i) => `
        <div class="roteiros__step ${i % 2 ? "roteiros__step--right" : "roteiros__step--left"}" style="--roteiros-step-color:${CK[i]};--roteiros-step-contrast:${KT[i]}">
          <div class="roteiros__card">
            <img src="${IMG[p[3]] || ""}" alt="">
            <div><h3 class="roteiros__card-title">${p[0]}</h3><p class="roteiros__card-description">${p[1]}</p><em class="roteiros__card-meta">${p[2].join(" · ")}</em></div>
          </div>
          <div class="roteiros__decoration roteiros__decoration--${KEY[i]}" aria-hidden="true">${DECO[KEY[i]]}</div>
        </div>`
      ).join("");

    const trF = $("#trFill");
    const trP = $("#trPlane");
    const trS = $$(".roteiros__step");
    const trScroll = () => {
      const r = trailEl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      const y = p * r.height;
      if (trP) trP.style.top = y - 22 + "px";
      if (trF) trF.style.height = y + "px";
      trS.forEach((step) => {
        if (step.offsetTop + step.offsetHeight / 2 <= y + 40) step.classList.add("roteiros__step--visible");
      });
    };
    window.addEventListener("scroll", trScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", trScroll));
    trScroll();
  }

  if ($("#rtRib")) {
    $("#rtRib").innerHTML = Array(4)
      .fill(["Onde ficar", "Onde comer", "Onde ir", "Deslocamento", "Dicas de viajante"].map((x) => `<span>${x}</span>`).join(""))
      .join("");
  }

  $$(".recomendacao.recomendacao--v2 img[data-i]").forEach((i) => {
    if (IMG[i.dataset.i]) i.src = IMG[i.dataset.i];
  });

  const fixRib = () =>
    $$(".marquee__track").forEach((t) => {
      if (!t.dataset.o) t.dataset.o = t.innerHTML;
      t.innerHTML = t.dataset.o;
      const ch = [...t.children];
      const n = ch.length / 2;
      let set = ch;
      if (
        Number.isInteger(n) &&
        n > 0 &&
        ch.slice(0, n).map((x) => x.textContent).join("|") === ch.slice(n).map((x) => x.textContent).join("|")
      ) {
        set = ch.slice(0, n);
      }
      const u = set.map((x) => x.outerHTML).join("");
      t.innerHTML = u;
      const w = t.getBoundingClientRect().width;
      if (!w) return;
      let k = 1;
      while (w * k < window.innerWidth * 1.3 && k < 14) k++;
      t.innerHTML = u.repeat(k * 2);
      t.style.setProperty("--mqd", (w * k) / 80 + "s");
    });

  fixRib();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fixRib);
  }
  let rz = null;
  const onResize = () => {
    window.clearTimeout(rz);
    rz = window.setTimeout(fixRib, 200);
  };
  window.addEventListener("resize", onResize);
  cleanups.push(() => window.removeEventListener("resize", onResize));

  return () => {
    cleanups.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore cleanup error
      }
    });
  };
}
