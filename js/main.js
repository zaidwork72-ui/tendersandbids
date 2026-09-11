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

document.querySelector(".search-bar__icon").innerHTML = icons.search;

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

renderList("preview-results", homepageData.searchResults, (item) => `
    <article class="result-row">
        <div>
            <p class="result-row__meta">
                <span>${item.flag}</span>
                <span>${item.country}</span>
                <span class="result-row__dot">·</span>
                <span class="result-row__industry">${item.industry}</span>
            </p>
            <p class="result-row__title">${item.title}</p>
        </div>
        <div class="result-row__aside">
            <span class="result-row__value">${item.value}</span>
            <span class="result-row__deadline${item.urgent ? " is-urgent" : ""}">${item.deadline}</span>
        </div>
    </article>
`);

renderList("step-grid", homepageData.steps, (item) => `
    <article class="step-card${item.accent ? " is-accent" : ""}">
        <p class="step-card__num">${item.number}</p>
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
