// components.js

const rootPath = window.location.pathname.includes('/pages/') ? '../../' : './';

const icons = {
  chevron: '<span class="material-symbols-rounded" aria-hidden="true">expand_more</span>',
  search: '<span class="material-symbols-rounded" aria-hidden="true">search</span>',
  arrow: '<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>',
  check: '<span class="material-symbols-rounded icon-check" aria-hidden="true">check</span>',
  verified: '<span class="material-symbols-rounded icon-brand" aria-hidden="true">verified</span>',
  globe: '<span class="material-symbols-rounded icon-brand" aria-hidden="true">public</span>',
  unlock: '<span class="material-symbols-rounded icon-brand" aria-hidden="true">lock_open</span>',
  layers: '<span class="material-symbols-rounded icon-brand" aria-hidden="true">layers</span>',
  youtube: `
    <span class="social-icon" style="background:#E8EAF4;">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.8 3.9-6.8 3.9Z"/>
      </svg>
    </span>
  `,
  facebook: `
    <span class="social-icon" style="background:#E8EAF4;">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.6v3h2.7v8h3.2Z"/>
      </svg>
    </span>
  `,
  instagram: `
    <span class="social-icon" style="background:#E8EAF4;">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1"/>
      </svg>
    </span>
  `,
  twitter: `
    <span class="social-icon" style="background:#E8EAF4;">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.2-8.2L3 2h6.2l4.3 5.7L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z"/>
      </svg>
    </span>
  `,
  linkedin: `
    <span class="social-icon" style="background:#E8EAF4;">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 8.5H3V21h3.5V8.5ZM4.8 3A2.1 2.1 0 1 0 4.8 7.2 2.1 2.1 0 0 0 4.8 3ZM21 13.8c0-3.8-2-5.6-4.7-5.6-2.2 0-3.2 1.2-3.8 2v-1.7H9V21h3.5v-6.2c0-1.6.3-3.2 2.3-3.2 1.9 0 1.9 1.8 1.9 3.3V21H21v-7.2Z"/>
      </svg>
    </span>
  `,
  google: `
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#4285F4" d="M21.35 12.27c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"/>
      <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75z"/>
      <path fill="#FBBC05" d="M6.54 13.83A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.83V7.64H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.25-2.53z"/>
      <path fill="#EA4335" d="M12 6.14c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 3.15 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.25 2.53C7.31 7.86 9.46 6.14 12 6.14z"/>
    </svg>
  `,
  microsoft: `
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022"/>
    <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00"/>
    <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF"/>
    <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900"/>
  </svg>
`,

apple: `
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.05 12.54c-.02-2.25 1.84-3.34 1.92-3.39-1.05-1.53-2.68-1.74-3.25-1.76-1.37-.14-2.7.82-3.4.82-.71 0-1.8-.8-2.95-.78-1.51.02-2.91.88-3.69 2.22-1.59 2.76-.4 6.82 1.12 9.06.76 1.1 1.64 2.32 2.81 2.28 1.13-.05 1.56-.73 2.93-.73 1.36 0 1.75.73 2.94.71 1.22-.02 1.99-1.11 2.72-2.22.85-1.28 1.2-2.52 1.22-2.59-.03-.01-2.34-.9-2.37-3.62ZM14.82 5.93c.62-.75 1.04-1.79.93-2.83-.9.04-1.99.6-2.64 1.35-.58.67-1.09 1.73-.95 2.75 1.01.08 2.04-.51 2.66-1.27Z"
    />
  </svg>
`
};

function renderNavbar() {
  const links = homepageData.navLinks.map((link) => `
    <li>
      <a class="nav-link" href="${link.href}">
        ${link.label}
        ${link.hasChevron ? `<span class="nav-link__chevron">${icons.chevron}</span>` : ""}
      </a>
    </li>
  `).join("");

  return `
    <header class="site-header">
      <nav class="navbar" aria-label="Primary">
        <a class="brand" href="index.html" aria-label="Tenders & Bids">
          <img src="assets/logos/logo.svg" alt="" width="130" height="23">
        </a>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div class="navbar__right">
          <ul class="nav-list">${links}</ul>
          <a class="btn btn-primary btn-sm" href="${rootPath}pages/auth/login.html">Get started free</a>
        </div>
      </nav>
    </header>
  `;
}

function renderFooter() {
  const columns = homepageData.footerColumns.map((column) => `
    <div class="footer-col">
      <p class="footer-col__title">${column.title}</p>
      <ul>
        ${column.links.map((item) => `<li><a href="#">${item}</a></li>`).join("")}
      </ul>
    </div>
  `).join("");

  return `
    <footer class="site-footer">
      <div class="shell footer-top">
        <div class="footer-brand">
          <a class="brand" href="index.html" aria-label="Tenders & Bids">
            <img src="assets/logos/logo.svg" alt="" width="130" height="23">
          </a>
          <p class="footer-brand__text">TendersAndBids is backed by first-generation technocrats with over 50 years of combined expertise in tendering and public procurement. Our mission is to provide accurate, up-to-date global tender information at an affordable cost to suppliers across industries</p>
          <p class="footer-col__title">CONNECT WITH US</p>
          <div class="social-row">
            <a href="#" aria-label="YouTube">${icons.youtube}</a>
            <a href="#" aria-label="Facebook">${icons.facebook}</a>
            <a href="#" aria-label="X">${icons.twitter}</a>
            <a href="#" aria-label="Instagram">${icons.instagram}</a>
            <a href="#" aria-label="LinkedIn">${icons.linkedin}</a>
          </div>
        </div>
        ${columns}
      </div>
      <div class = line><span class = actual-line></span></div>
      <div class="shell footer-bottom">
        <p>Copyright © 2026 TendersAndBids. All Rights Reserved.</p>
        <p class="footer-secure">Payment secured by: <img src="assets/images/stripe.png" alt="stripe" width="50" height="21"></p>
      </div>
    </footer>
  `;
}


document.querySelectorAll('[data-icon]').forEach((element) => {
  const iconName = element.dataset.icon;

  if (icons[iconName]) {
    element.innerHTML = icons[iconName];
  }
});