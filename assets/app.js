/* =====================================================================
   Charles Lippens, portfolio en une page
   JavaScript sans dépendance : thème clair ou sombre, menu mobile, ombre de la barre,
   section active, retour en haut, onglets de la veille, filtres des projets.
   Sans JavaScript, la page reste lisible : tout le contenu est dans le HTML.
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Thème clair ou sombre, mémorisé dans le navigateur seulement */
  (function () {
    var racine = document.documentElement;
    var bouton = $(".theme-toggle");
    var meta = $('meta[name="theme-color"]');
    function appliquer(theme, memoriser) {
      var sombre = theme === "dark";
      racine.setAttribute("data-theme", theme);
      if (bouton) {
        bouton.setAttribute("aria-pressed", sombre ? "true" : "false");
        bouton.setAttribute("aria-label", sombre ? "Activer le thème clair" : "Activer le thème sombre");
      }
      if (meta) meta.setAttribute("content", sombre ? "#0d141d" : "#1f3a5f");
      if (memoriser) { try { localStorage.setItem("theme", theme); } catch (e) { /* stockage indisponible */ } }
    }
    appliquer(racine.getAttribute("data-theme") || "light", false);
    if (bouton) {
      bouton.addEventListener("click", function () {
        appliquer(racine.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
      });
    }
  })();

  /* 2. Menu mobile */
  var burger = $("#burger");
  var menu = $("#menu");
  function fermerMenu() {
    if (!menu || !burger) return;
    menu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu de navigation");
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(ouvert));
      burger.setAttribute("aria-label", ouvert ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation");
    });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", fermerMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") fermerMenu(); });
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("is-open") && !menu.contains(e.target) && !burger.contains(e.target)) fermerMenu();
    });
  }

  /* 3. Ombre de la barre de navigation au défilement */
  var nav = $("#nav");
  function ombreNav() { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12); }
  ombreNav();
  window.addEventListener("scroll", ombreNav, { passive: true });

  /* 4. Section active dans le menu */
  var liens = $$(".nav-links a[data-spy]");
  var sections = liens.map(function (a) { return document.getElementById(a.getAttribute("data-spy")); })
    .filter(Boolean);
  function activerLien(id) {
    liens.forEach(function (a) {
      var actif = a.getAttribute("data-spy") === id;
      a.classList.toggle("is-active", actif);
      if (actif) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }
  if ("IntersectionObserver" in window && sections.length) {
    var espion = new IntersectionObserver(function (entrees) {
      var visibles = entrees.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (visibles.length) activerLien(visibles[0].target.id);
    }, { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] });
    sections.forEach(function (s) { espion.observe(s); });
    window.addEventListener("scroll", function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        activerLien(sections[sections.length - 1].id);
      }
    }, { passive: true });
  }

  /* 5. Retour en haut */
  var haut = $("#haut");
  if (haut) {
    var afficherHaut = function () { haut.classList.toggle("is-visible", window.scrollY > 600); };
    afficherHaut();
    window.addEventListener("scroll", afficherHaut, { passive: true });
    haut.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: mouvementReduit ? "auto" : "smooth" });
    });
  }

  /* 6. Onglets de la veille (flèches gauche et droite, Début et Fin) */
  var onglets = $$(".veille-tab");
  var panneaux = $$(".veille-panneau");
  function activerOnglet(num, focaliser) {
    onglets.forEach(function (t) {
      var actif = t.getAttribute("data-tab") === num;
      t.classList.toggle("is-active", actif);
      t.setAttribute("aria-selected", String(actif));
      t.setAttribute("tabindex", actif ? "0" : "-1");
      if (actif && focaliser) t.focus();
    });
    panneaux.forEach(function (p) {
      var actif = p.id === "veille-" + num;
      p.classList.toggle("is-active", actif);
      if (actif) p.removeAttribute("hidden");
      else p.setAttribute("hidden", "");
    });
  }
  onglets.forEach(function (t, i) {
    t.addEventListener("click", function () { activerOnglet(t.getAttribute("data-tab"), false); });
    t.addEventListener("keydown", function (e) {
      var idx = null;
      if (e.key === "ArrowRight") idx = (i + 1) % onglets.length;
      else if (e.key === "ArrowLeft") idx = (i - 1 + onglets.length) % onglets.length;
      else if (e.key === "Home") idx = 0;
      else if (e.key === "End") idx = onglets.length - 1;
      if (idx !== null) {
        e.preventDefault();
        activerOnglet(onglets[idx].getAttribute("data-tab"), true);
      }
    });
  });

  /* 7. Filtres des projets */
  var filtres = $$(".filtre");
  var projets = $$("#grille-projets .projet");
  var vide = $("#projets-vide");
  var compte = $("#projets-compte");
  function appliquerFiltre(cat, libelle) {
    var visibles = 0;
    projets.forEach(function (p) {
      var cats = (p.getAttribute("data-cat") || "").split(/\s+/);
      var ok = cat === "tous" || cats.indexOf(cat) !== -1;
      p.classList.toggle("is-hidden", !ok);
      if (ok) visibles++;
    });
    if (vide) vide.style.display = visibles === 0 ? "block" : "none";
    if (compte) compte.textContent = visibles + (visibles > 1 ? " projets affichés" : " projet affiché") +
      (cat === "tous" ? "." : ", filtre " + libelle + ".");
  }
  filtres.forEach(function (f) {
    f.addEventListener("click", function () {
      filtres.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      f.setAttribute("aria-pressed", "true");
      appliquerFiltre(f.getAttribute("data-filtre"), f.textContent.trim());
    });
  });
})();
