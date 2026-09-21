// main.js

function mount(id, html) {
    document.getElementById(id).outerHTML = html;
}

function renderList(id, items, template) {
    const root = document.getElementById(id);
    if (!root) return;
    root.innerHTML = items.map(template).join("");
}

mount("site-header", renderNavbar());
mount("site-footer", renderFooter());

const heroSection = document.querySelector(".hero");
if (heroSection) {
    const glow = heroSection.querySelector(".hero__glow");

    const updateHeroGlow = (event) => {
        if (!glow) return;

        const rect = heroSection.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        heroSection.style.setProperty("--hero-glow-x", `${x}%`);
        heroSection.style.setProperty("--hero-glow-y", `${y}%`);
    };

    heroSection.addEventListener("pointerenter", (event) => {
        if (!glow) return;
        glow.style.transition = "none"; // purani jagah se slide na ho, seedha naye point par appear ho
        updateHeroGlow(event);
        glow.style.opacity = "0.95";
        requestAnimationFrame(() => {
            glow.style.transition = "";
        });
    });

    heroSection.addEventListener("pointermove", updateHeroGlow);

    heroSection.addEventListener("pointerleave", () => {
        if (!glow) return;
        glow.style.opacity = "0"; // hero ke bahar jaate hi turant hide, koi leftover position nahi
    });
}

const searchIcon = document.querySelector(".search-bar__icon");
if (searchIcon) searchIcon.innerHTML = icons.search;

renderList("trust-badges", homepageData.trustBadges, (item) => `
    <div class="trust-item">
        ${icons[item.icon]}
        <span>${item.label}</span>
    </div>
`);

renderList("filter-chips", homepageData.searchFilters, (item) => `
    <div class="filter-chip">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
    </div>
`);

renderList("preview-results", homepageData.steps, (item) => `
    <article class="result-row">
        <div>
            <p class="result-row__meta">
                <span class = "num">${item.number}</span>
                <span class = "icon">${icons[item.icon]}</span>
            </p>
            <p class="result-roww">
                <span class="result-row__industry">${item.title}</span>
                <span class="result-row__title">${item.text}</span>
            </p>
        </div>
    </article>
`);

renderList("step-grid", homepageData.why, (item) => `
    <article class="step-card${item.accent ? " is-accent" : ""}">
        <p class="step-card__num">${icons[item.icon]}</p>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
    </article>
`);

renderList("region-grid", homepageData.regions, (item) => `
    <a class="region-card" href="#">
        <span>
            <strong>${item.name}</strong>
            <small>${item.count}</small>
        </span>
        ${icons.arrow}
    </a>
`);

renderList("industry-chips", homepageData.industries, (item) => `
    <span class="chip">
        <span>${item.name}</span>
        <b>${item.count}</b>
    </span>
`);

renderList("credit-features", homepageData.creditFeatures, (item) => `
    <li>${icons.check}<span>${item}</span></li>
`);


const toggle = document.querySelector(".nav-toggle");
const navRight = document.querySelector(".navbar__right");
if (toggle && navRight) {
    toggle.addEventListener("click", () => {
        const open = navRight.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
}

const searchInput = document.querySelector(".search-bar__input");
const clearSearchButton = document.querySelector(".search-bar__clear");
if (searchInput) {
    const lineHeight = parseFloat(getComputedStyle(searchInput).lineHeight) || 20;
    const maxHeight = lineHeight * 2; // strict 2-line cap

    const autosizeSearchInput = () => {
        searchInput.style.height = "auto";
        const needed = searchInput.scrollHeight;

        if (needed <= maxHeight) {
            searchInput.style.height = `${needed}px`;
            searchInput.classList.remove("is-scrollable");
        } else {
            searchInput.style.height = `${maxHeight}px`;
            searchInput.classList.add("is-scrollable");
        }
    };

    searchInput.addEventListener("input", autosizeSearchInput);
    autosizeSearchInput();

    if (clearSearchButton) {
        clearSearchButton.addEventListener("click", () => {
            searchInput.value = "";
            autosizeSearchInput();
            searchInput.blur();
            searchInput.focus();
        });
    }
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 80}ms`;
        revealObserver.observe(item);
    });
}

// stat-target 
const counter = document.querySelector(".counter");
if (counter) {
    const targetText = counter.dataset.target || "0";
    const targetSuffix = targetText.includes("+") ? "+" : "";
    const target = Number.parseInt(targetText.replace(/[^0-9]/g, ""), 10) || 0;
    const duration = 2000;

    let startTime = null;
    function animateCounter(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }

        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentValue = Math.floor(progress * target);
        counter.textContent = `${currentValue.toLocaleString()}${targetSuffix}`;

        if (progress < 1) {
            requestAnimationFrame(animateCounter);
        }
    }

    requestAnimationFrame(animateCounter);
}


// ===== Page init ===== //

document.addEventListener("DOMContentLoaded", () => {
//   renderHeader();
//   renderFooter();

  renderActiveFilters();
  renderSidebarFilters();
  renderResultsHeader();
  renderTenderCards();

  bindSearchClear();
});

// --- Active filter tags (blue = active, grey = inactive) ---
function renderActiveFilters() {
  const wrap = document.getElementById("active-filter");
  if (!wrap) return;
  wrap.innerHTML = `
    <span class="label">Active filter mapping:</span>
    ${tenderListingPage.activeFilter
      .map(
        (f) => `
      <span class="filter-tag ${f.active ? "active" : "inactive"}">
        ${f.name}
        <button type="button" aria-label="Remove ${f.name}">
          ${f.active ? icons.closeBlue : icons.closeGrey}
        </button>
      </span>
    `
      )
      .join("")}
  `;
}

// --- Sidebar: region / industry / tender type checkboxes ---
function renderSidebarFilters() {
  renderList("region-filters", tenderListingPage.regions, (item) => `
    <label class="checkbox-row">
      <span class="left">
        <input type="checkbox" />
        <span>${item.name}</span>
      </span>
      <span class="count">${item.count}</span>
    </label>
  `);

  renderList("industry-filters", tenderListingPage.industries, (item) => `
    <label class="checkbox-row">
      <span class="left">
        <input type="checkbox" checked />
        <span>${item.name}</span>
      </span>
      <span class="count">${item.count}</span>
    </label>
  `);

  renderList("tender-type-filters", tenderListingPage.tenderTypes, (item) => `
    <label class="checkbox-row">
      <span class="left">
        <input type="checkbox" />
        <span>${item.name}</span>
      </span>
    </label>
  `);
}

// --- Results count ---
function renderResultsHeader() {
  const el = document.getElementById("results-count");
  if (el) el.textContent = `${tenderListingPage.resultsCount.toLocaleString()} opportunities found`;
}

// --- Tender cards ---
function renderTenderCards() {
  renderList("tender-list", tenderListingPage.tenders, (t) => `
    <article class="tender-card">
      <div class="tender-card-top">
        <div>
          <div class="tender-meta-line">
            <span class="flag">${t.flag}</span>
            <span>${t.country}</span>
            <span class="sep">|</span>
            <span class="tag-pill">${t.type}</span>
            <span>${t.industry}</span>
            ${badgeTemplate(t)}
          </div>
          <h3 class="tender-title">${t.title}</h3>
          <p class="tender-buyer">${t.buyer}</p>
        </div>
        <div>
          <div class="tender-value">${t.value}</div>
          <div class="tender-closes ${t.urgent ? "urgent" : ""}">Closes ${t.closes}</div>
        </div>
      </div>

      <p class="tender-desc">${t.desc}</p>

      <div class="tender-card-bottom">
        <span class="tender-ref">REF: ${t.ref} &nbsp;·&nbsp; Published ${t.published}</span>
        <div class="tender-actions">
          <button class="icon-btn" aria-label="Save tender">${icons.star}</button>
          <button class="btn-view">View ${icons.view}</button>
        </div>
      </div>
    </article>
  `);
}

function badgeTemplate(t) {
  if (t.status === "open") {
    return `<span class="badge open"><span class="dot"></span>OPEN</span>`;
  }
  return `<span class="badge closing"><span class="dot"></span>CLOSING ${t.closingIn}</span>`;
}

// --- Search bar clear button ---
function bindSearchClear() {
  const input = document.querySelector(".search-input input");
  const clearBtn = document.querySelector(".clear-search");
  if (!input || !clearBtn) return;
  clearBtn.addEventListener("click", () => {
    input.value = "";
    input.focus();
  });
}