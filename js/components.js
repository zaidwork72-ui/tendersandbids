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
  youtube: '<span class="material-symbols-rounded" aria-hidden="true">smart_display</span>',
  facebook: '<span class="material-symbols-rounded" aria-hidden="true">facebook</span>',
  twitter: '<span class="material-symbols-rounded" aria-hidden="true">alternate_email</span>',
  instagram: '<span class="material-symbols-rounded" aria-hidden="true">photo_camera</span>',
  linkedin: '<span class="material-symbols-rounded" aria-hidden="true">hub</span>',
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