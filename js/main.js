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