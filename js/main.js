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


// =========================================================
// ===== Tender Listing Page: filter / sort / pagination ===
// =========================================================

// Maps each country present in tenderListingPage.tenders to the
// sidebar "Region" group it belongs to. Extend this if new
// countries are added to data.js.
const COUNTRY_REGION_MAP = {
    "Germany": "Europe",
    "United Kingdom": "Europe",
    "Netherlands": "Europe",
    "United Arab Emirates": "Middle East",
    "Saudi Arabia": "Middle East",
    "Australia": "Asia-Pacific",
    "Singapore": "Asia-Pacific",
    "Canada": "North America",
    "South Africa": "Africa",
    "Brazil": "Latin America",
};

// Single source of truth for every filter / sort / pagination control.
const listingState = {
    filters: {
        region: new Set(),
        industry: new Set(),
        type: new Set(),
    },
    closingWithin30: false,
    sortBy: "relevance",
    currentPage: 1,
    pageSize: 10,
};

const SORT_OPTION_MAP = {
    "Relevance": "relevance",
    "Newest": "newest",
    "Closing soon": "closing",
    "Value: High to low": "value",
};

function isTenderListingPage() {
    return typeof tenderListingPage !== "undefined" && !!document.getElementById("tender-list");
}

// Pulls the numeric magnitude out of strings like "EUR 2.4M" or
// "USD 890K" so tenders can be sorted by value regardless of currency.
function parseTenderValue(str) {
    if (!str) return 0;
    const match = String(str).replace(/,/g, "").match(/([\d.]+)\s*([MKB])?/i);
    if (!match) return 0;
    let num = parseFloat(match[1]);
    const suffix = (match[2] || "").toUpperCase();
    if (suffix === "M") num *= 1e6;
    else if (suffix === "K") num *= 1e3;
    else if (suffix === "B") num *= 1e9;
    return num;
}

// The sample dataset's dates are fixed (Dec 2024 - Apr 2025), so
// "today" for the purposes of the demo data is derived from the
// tenders that are already flagged as "closing" (status + closingIn),
// instead of the real wall-clock date — otherwise every tender in
// this fixed dataset would already be in the past. Falls back to the
// real current date if no "closing" tender is present in the data.
function getMockToday() {
    const reference = tenderListingPage.tenders.find((t) => t.status === "closing" && t.closingIn);
    if (reference) {
        const days = parseInt(reference.closingIn, 10) || 0;
        return new Date(new Date(reference.closes).getTime() - days * 86400000);
    }
    return new Date();
}

function getFilteredTenders() {
    const { region, industry, type } = listingState.filters;
    const today = listingState.closingWithin30 ? getMockToday() : null;

    return tenderListingPage.tenders.filter((t) => {
        if (region.size && !region.has(COUNTRY_REGION_MAP[t.country])) return false;
        if (industry.size && !industry.has(t.industry)) return false;
        if (type.size && !type.has(String(t.type || "").toLowerCase())) return false;
        if (today) {
            const daysToClose = (new Date(t.closes) - today) / 86400000;
            if (daysToClose < 0 || daysToClose > 30) return false;
        }
        return true;
    });
}

function getSortedTenders(list) {
    const sorted = list.slice();
    switch (listingState.sortBy) {
        case "newest":
            sorted.sort((a, b) => new Date(b.published) - new Date(a.published));
            break;
        case "closing":
            sorted.sort((a, b) => new Date(a.closes) - new Date(b.closes));
            break;
        case "value":
            sorted.sort((a, b) => parseTenderValue(b.value) - parseTenderValue(a.value));
            break;
        default:
            // "relevance" — keep the original data order
            break;
    }
    return sorted;
}

function getPaginatedTenders(list) {
    const start = (listingState.currentPage - 1) * listingState.pageSize;
    return list.slice(start, start + listingState.pageSize);
}

// Master render: filter -> sort -> paginate -> render (in that order),
// then re-sync every dependent piece of UI from the same state.
function renderListingPage() {
    const filtered = getFilteredTenders();
    const sorted = getSortedTenders(filtered);

    const totalPages = Math.max(1, Math.ceil(sorted.length / listingState.pageSize));
    if (listingState.currentPage > totalPages) listingState.currentPage = totalPages;
    if (listingState.currentPage < 1) listingState.currentPage = 1;

    const pageItems = getPaginatedTenders(sorted);

    renderActiveFilters();
    renderSidebarFilters();
    renderResultsHeader(sorted.length);
    renderTenderCards(pageItems);
    renderResultsFooter(sorted.length, pageItems.length);
    syncListingPanelHeights();
}

// Chips derived from the actual sidebar selections + the "closing
// within 30 days" checkbox. These are on top of (not instead of)
// the original static tags in tenderListingPage.activeFilter.
function buildActiveFilterChips() {
    const chips = [];
    listingState.filters.region.forEach((value) => chips.push({ group: "region", value, label: value }));
    listingState.filters.industry.forEach((value) => chips.push({ group: "industry", value, label: value }));
    listingState.filters.type.forEach((value) => chips.push({
        group: "type",
        value,
        label: value.charAt(0).toUpperCase() + value.slice(1),
    }));
    if (listingState.closingWithin30) {
        chips.push({ group: "closing30", value: "closing30", label: "Closing within 30 days" });
    }
    return chips;
}

// --- Active filter tags ---
// Renders the original static tags from tenderListingPage.activeFilter
// as-is (left untouched, just made removable), plus dynamic chips for
// whatever the sidebar / "closing within 30 days" checkbox actually has
// selected right now.
function renderActiveFilters() {
    const wrap = document.getElementById("active-filter");
    if (!wrap) return;

    const staticChipsHtml = tenderListingPage.activeFilter
      .map(
        (f, index) => `
          <span class="filter-tag ${f.active ? "active" : "inactive"}">
            ${f.name}
            <button type="button" class="remove-filter" aria-label="Remove ${f.name}" data-kind="static" data-index="${index}">
              ${f.active ? icons.blueX : icons.greyX}
            </button>
          </span>
        `
      )
      .join("");

    const dynamicChipsHtml = buildActiveFilterChips()
      .map(
        (c) => `
          <span class="filter-tag active">
            ${c.label}
            <button type="button" class="remove-filter" aria-label="Remove ${c.label}" data-kind="dynamic" data-group="${c.group}" data-value="${c.value}">
              ${icons.blueX}
            </button>
          </span>
        `
      )
      .join("");

    wrap.innerHTML = `
    <span class="label">Active filter mapping:</span>
    ${staticChipsHtml}
    ${dynamicChipsHtml}
  `;

    wrap.querySelectorAll(".remove-filter").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.dataset.kind === "static") {
                tenderListingPage.activeFilter.splice(Number(btn.dataset.index), 1);
                renderActiveFilters();
                syncListingPanelHeights();
                return;
            }

            const { group, value } = btn.dataset;
            if (group === "closing30") {
                listingState.closingWithin30 = false;
                const checkbox = document.getElementById("closing-30");
                if (checkbox) checkbox.checked = false;
            } else {
                listingState.filters[group].delete(value);
            }
            listingState.currentPage = 1;
            renderListingPage();
        });
    });
}

// --- Sidebar: region / industry / tender type checkboxes ---
function renderSidebarFilters() {
    renderList("region-filters", tenderListingPage.regions, (item) => `
    <label class="checkbox-row">
      <span class="left">
        <input type="checkbox" data-group="region" value="${item.name}" ${listingState.filters.region.has(item.name) ? "checked" : ""} />
        <span>${item.name}</span>
      </span>
      <span class="count">${item.count}</span>
    </label>
  `);

    renderList("industry-filters", tenderListingPage.industries, (item) => `
    <label class="checkbox-row">
      <span class="left">
        <input type="checkbox" data-group="industry" value="${item.name}" ${listingState.filters.industry.has(item.name) ? "checked" : ""} />
        <span>${item.name}</span>
      </span>
      <span class="count">${item.count}</span>
    </label>
  `);

    renderList("tender-type-filters", tenderListingPage.tenderTypes, (item) => {
        const value = item.name.toLowerCase();
        return `
    <label class="checkbox-row">
      <span class="left">
        <input type="checkbox" data-group="type" value="${value}" ${listingState.filters.type.has(value) ? "checked" : ""} />
        <span>${item.name}</span>
      </span>
    </label>
  `;
    });

    document
        .querySelectorAll("#region-filters input, #industry-filters input, #tender-type-filters input")
        .forEach((input) => {
            input.addEventListener("change", () => {
                const { group } = input.dataset;
                const { value } = input;
                if (input.checked) listingState.filters[group].add(value);
                else listingState.filters[group].delete(value);
                listingState.currentPage = 1;
                renderListingPage();
            });
        });
}

// --- Results count (top of results panel) ---
function renderResultsHeader(totalCount) {
    const el = document.getElementById("results-count");
    if (el) el.textContent = `${totalCount.toLocaleString()} opportunities found`;
}

// --- Tender cards ---
function renderTenderCards(items) {
    const root = document.getElementById("tender-list");
    if (!root) return;

    if (!items.length) {
        root.innerHTML = `
      <div class="tender-empty-state">
        <p class="tender-empty-title">No tenders found</p>
        <p class="tender-empty-text">Try adjusting or removing your filters.</p>
      </div>
    `;
        return;
    }

    root.innerHTML = items
      .map(
        (t) => `
    <article class="tender-card">

      <!-- Top section -->
      <div class="tender-card-top">

        <!-- Left content -->
        <div class="tender-card-left">

          <div class="tender-meta-line">
            <span class="flag">${icons[t.flag]}</span>
            <span>${t.country}</span>
            
            <span class="tag-pill">${t.type}</span>
            <span>${t.industry}</span>
            ${badgeTemplate(t)}
          </div>

          <h3 class="tender-title">${t.title}</h3>

          <p class="tender-buyer">${t.buyer}</p>

          <p class="tender-desc">${t.desc}</p>

        </div>

        <!-- Right content -->
        <div class="tender-card-right">

          <div class="tender-value">${t.value}</div>

          <div class="tender-closes ${t.urgent ? "urgent" : ""}">
            Closes ${t.closes}
          </div>

          <div class="tender-actions">
            <button class="icon-btn" aria-label="Save tender">
              ${icons.favourite}
            </button>

            <button class="btn-view">
              View ${icons.viewArrow}
            </button>
          </div>

        </div>

      </div>

      <!-- Bottom section -->
      <div class="tender-card-bottom">
        <span class="tender-ref">
          REF: ${t.ref} &nbsp;·&nbsp; Published ${t.published}
        </span>
      </div>

    </article>
  `
      )
      .join("");
}

function badgeTemplate(t) {
    if (t.status === "open") {
        return `<span class="badge open"><span class="dot"></span>OPEN</span>`;
    }
    return `<span class="badge closing"><span class="dot"></span>CLOSING ${t.closingIn}</span>`;
}

// --- Bottom: "Showing results X out of Y" + pagination ---
function renderResultsFooter(totalCount, pageCount) {
    const footer = document.getElementById("results-footer");
    if (!footer) return;

    const totalPages = Math.max(1, Math.ceil(totalCount / listingState.pageSize));
    const current = listingState.currentPage;

    footer.innerHTML = `
    <div class="results-info">Showing results ${pageCount} out of ${totalCount}</div>
    <div class="pagination">
      <button type="button" class="page-btn page-prev" ${current === 1 ? "disabled" : ""}>Previous</button>
      ${buildPageNumbersMarkup(current, totalPages)}
      <button type="button" class="page-btn page-next" ${current === totalPages ? "disabled" : ""}>Next</button>
    </div>
  `;

    const prevBtn = footer.querySelector(".page-prev");
    const nextBtn = footer.querySelector(".page-next");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (listingState.currentPage > 1) {
                listingState.currentPage -= 1;
                renderListingPage();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (listingState.currentPage < totalPages) {
                listingState.currentPage += 1;
                renderListingPage();
            }
        });
    }

    footer.querySelectorAll(".page-num").forEach((btn) => {
        btn.addEventListener("click", () => {
            listingState.currentPage = Number(btn.dataset.page);
            renderListingPage();
        });
    });
}

function buildPageNumbersMarkup(current, totalPages) {
    const pages = [];
    const maxShown = 5;

    if (totalPages <= maxShown + 2) {
        for (let i = 1; i <= totalPages; i += 1) pages.push(i);
    } else {
        pages.push(1);
        const start = Math.max(2, current - 1);
        const end = Math.min(totalPages - 1, current + 1);
        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i += 1) pages.push(i);
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
    }

    return pages
      .map((p) =>
        p === "..."
          ? `<span class="page-ellipsis">...</span>`
          : `<button type="button" class="page-btn page-num ${p === current ? "active" : ""}" data-page="${p}">${p}</button>`
      )
      .join("");
}

// --- Sidebar collapse/expand (per filter group), state-preserving ---
function bindFilterCollapse() {
    document.querySelectorAll(".filter-block").forEach((block) => {
        const title = block.querySelector(".filter-block-title");
        const content = block.querySelector(".filterssss");
        if (!title || !content) return;

        title.addEventListener("click", () => {
            const collapsed = block.classList.toggle("is-collapsed");
            content.style.display = collapsed ? "none" : "";
        });
    });
}

// --- Sort dropdown ---
function bindSortControl() {
    const select = document.querySelector(".sort-control select");
    if (!select) return;

    select.addEventListener("change", () => {
        listingState.sortBy = SORT_OPTION_MAP[select.value] || "relevance";
        listingState.currentPage = 1;
        renderListingPage();
    });
}

// --- "Closing within 30 days" checkbox ---
function bindClosing30Filter() {
    const checkbox = document.getElementById("closing-30");
    if (!checkbox) return;

    checkbox.checked = listingState.closingWithin30;
    checkbox.addEventListener("change", () => {
        listingState.closingWithin30 = checkbox.checked;
        listingState.currentPage = 1;
        renderListingPage();
    });
}

// =========================================================
// Mobile Filter Bottom Sheet
// =========================================================

function renderMobileFilterOptions() {

    const regionRoot = document.getElementById("mobile-region-filters");
    const industryRoot = document.getElementById("mobile-industry-filters");
    const typeRoot = document.getElementById("mobile-type-filters");

    if (!regionRoot || !industryRoot || !typeRoot) return;


    // -----------------------------------------------------
    // Region
    // -----------------------------------------------------
    regionRoot.innerHTML = tenderListingPage.regions.map((item) => `
        <label class="mobile-filter-option">
            <span class="mobile-filter-option__left">
                <input
                    type="checkbox"
                    data-mobile-group="region"
                    value="${item.name}"
                    ${listingState.filters.region.has(item.name) ? "checked" : ""}
                >
                <span>${item.name}</span>
            </span>
            <span class="mobile-filter-option__count">
                ${item.count}
            </span>
        </label>
    `).join("");

    industryRoot.innerHTML = tenderListingPage.industries.map((item) => `
        <label class="mobile-filter-option">
            <span class="mobile-filter-option__left">
                <input
                    type="checkbox"
                    data-mobile-group="industry"
                    value="${item.name}"
                    ${listingState.filters.industry.has(item.name) ? "checked" : ""}
                >
                <span>${item.name}</span>
            </span>
            <span class="mobile-filter-option__count">
                ${item.count}
            </span>
        </label>
    `).join("");

    typeRoot.innerHTML = tenderListingPage.tenderTypes.map((item) => {
        const value = item.name.toLowerCase();
        return `
            <label class="mobile-filter-option">
                <span class="mobile-filter-option__left">
                    <input
                        type="checkbox"
                        data-mobile-group="type"
                        value="${value}"
                        ${listingState.filters.type.has(value) ? "checked" : ""}
                    >
                    <span>${item.name}</span>
                </span>
            </label>
        `;
    }).join("");

    const mobileClosing = document.getElementById("mobile-closing-30");
    if (mobileClosing) {
        mobileClosing.checked = listingState.closingWithin30;
    }
    updateMobileFilterCounts();
}

function bindMobileFilterOptions() {

    document
        .querySelectorAll("[data-mobile-group]")
        .forEach((input) => {

            input.addEventListener("change", () => {

                const group = input.dataset.mobileGroup;
                const value = input.value;

                if (input.checked) {
                    listingState.filters[group].add(value);
                } else {
                    listingState.filters[group].delete(value);
                }

                updateMobileFilterCounts();

            });

        });


    const closing = document.getElementById("mobile-closing-30");

    if (closing) {

        closing.addEventListener("change", () => {

            listingState.closingWithin30 = closing.checked;

            updateMobileFilterCounts();

        });

    }
}

function updateMobileFilterCounts() {

    const regionCount =
        document.getElementById("mobile-region-count");

    const industryCount =
        document.getElementById("mobile-industry-count");

    const typeCount =
        document.getElementById("mobile-type-count");


    if (regionCount) {

        const count = listingState.filters.region.size;

        regionCount.textContent =
            count ? `${count} selected` : "";

    }


    if (industryCount) {

        const count = listingState.filters.industry.size;

        industryCount.textContent =
            count ? `${count} selected` : "";

    }


    if (typeCount) {

        const count = listingState.filters.type.size;

        typeCount.textContent =
            count ? `${count} selected` : "";

    }
}

function openMobileFilterSheet() {

    const sheet =
        document.getElementById("mobile-filter-sheet");

    const overlay =
        document.getElementById("mobile-filter-overlay");

    if (!sheet || !overlay) return;


    renderMobileFilterOptions();
    bindMobileFilterOptions();


    sheet.classList.add("is-open");
    overlay.classList.add("is-open");

    sheet.setAttribute("aria-hidden", "false");

    document.body.classList.add("mobile-filter-open");
}


function closeMobileFilterSheet() {

    const sheet =
        document.getElementById("mobile-filter-sheet");

    const overlay =
        document.getElementById("mobile-filter-overlay");

    if (!sheet || !overlay) return;


    sheet.classList.remove("is-open");
    overlay.classList.remove("is-open");

    sheet.setAttribute("aria-hidden", "true");

    document.body.classList.remove("mobile-filter-open");
}

function bindMobileFilterGroups() {

    document
        .querySelectorAll("[data-mobile-filter-group]")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const group =
                    button.closest(".mobile-filter-group");

                if (!group) return;

                group.classList.toggle("is-open");

            });

        });

}

function bindMobileFilterActions() {

    const openButton =
        document.getElementById("mobile-filter-open");

    const closeButton =
        document.getElementById("mobile-filter-close");

    const overlay =
        document.getElementById("mobile-filter-overlay");

    const applyButton =
        document.getElementById("mobile-filter-apply");

    const resetButton =
        document.getElementById("mobile-filter-reset");


    // -----------------------------------------------------
    // Open
    // -----------------------------------------------------

    if (openButton) {

        openButton.addEventListener("click", () => {
            openMobileFilterSheet();
        });

    }


    // -----------------------------------------------------
    // Close
    // -----------------------------------------------------

    if (closeButton) {

        closeButton.addEventListener("click", () => {
            closeMobileFilterSheet();
        });

    }


    if (overlay) {

        overlay.addEventListener("click", () => {
            closeMobileFilterSheet();
        });

    }


    // -----------------------------------------------------
    // Apply
    // -----------------------------------------------------

    if (applyButton) {

        applyButton.addEventListener("click", () => {

            listingState.currentPage = 1;

            renderListingPage();

            closeMobileFilterSheet();

        });

    }


    // -----------------------------------------------------
    // Clear all
    // -----------------------------------------------------

    if (resetButton) {

        resetButton.addEventListener("click", () => {

            listingState.filters.region.clear();
            listingState.filters.industry.clear();
            listingState.filters.type.clear();

            listingState.closingWithin30 = false;

            renderMobileFilterOptions();
            bindMobileFilterOptions();

            updateMobileFilterCounts();

        });

    }

}

// --- 6. Independent scroll: sidebar and results each get their own
// fixed height (viewport height minus their own top offset), so a
// scroll gesture over one panel never moves the other or the page.
// Desktop only — mobile/tablet keep the normal stacked, page-scroll
// layout untouched.
function syncListingPanelHeights() {
    const sidebar = document.querySelector(".sidebar");
    const results = document.querySelector(".results");
    if (!sidebar || !results) return;

    if (window.innerWidth < 993) {
        sidebar.style.removeProperty("height");
        results.style.removeProperty("height");
        return;
    }

    [sidebar, results].forEach((panel) => {
        const top = panel.getBoundingClientRect().top;
        const height = Math.max(300, window.innerHeight - top - 24);
        panel.style.height = `${height}px`;
    });
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

// ===== Page init ===== //

document.addEventListener("DOMContentLoaded", () => {

    if (isTenderListingPage()) {

        bindClosing30Filter();

        renderListingPage();

        bindFilterCollapse();

        bindSortControl();

        // Mobile bottom-sheet filters
        bindMobileFilterActions();

        bindMobileFilterGroups();

        window.addEventListener(
            "resize",
            syncListingPanelHeights
        );
    }


    bindSearchClear();

});