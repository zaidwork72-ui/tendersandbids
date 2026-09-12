const icons = {
  chevron: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5.25" stroke="currentColor" stroke-width="1.3"/><path d="M11 11.5L14 14.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 8.2L7.1 10.3L11.2 6" stroke="#179462" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  verified: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true"><circle cx="10.5" cy="10" r="8" stroke="#2B62F5" stroke-width="1.4"/><path d="M7.2 10.2L9.4 12.3L13.8 7.7" stroke="#2B62F5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  globe: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true"><circle cx="10.5" cy="10" r="7.25" stroke="#2B62F5" stroke-width="1.3"/><path d="M3.5 10H17.5M10.5 2.75C12.8 5.1 14 7.5 14 10s-1.2 4.9-3.5 7.25C8.2 14.9 7 12.5 7 10s1.2-4.9 3.5-7.25Z" stroke="#2B62F5" stroke-width="1.3"/></svg>`,
  unlock: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true"><rect x="4.5" y="9" width="12" height="8" rx="1.4" stroke="#2B62F5" stroke-width="1.3"/><path d="M7.2 9V6.6A3.3 3.3 0 0 1 13.8 6.6" stroke="#2B62F5" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  layers: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true"><path d="M10.5 3.5L17.5 7L10.5 10.5L3.5 7L10.5 3.5Z" stroke="#2B62F5" stroke-width="1.3" stroke-linejoin="round"/><path d="M4 11.5L10.5 15L17 11.5" stroke="#2B62F5" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  youtube: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M16.8 6.2a2.1 2.1 0 0 0-1.5-1.5C14 4.4 10 4.4 10 4.4s-4 0-5.3.3a2.1 2.1 0 0 0-1.5 1.5C3 7.5 3 10 3 10s0 2.5.2 3.8a2.1 2.1 0 0 0 1.5 1.5c1.3.3 5.3.3 5.3.3s4 0 5.3-.3a2.1 2.1 0 0 0 1.5-1.5C17 12.5 17 10 17 10s0-2.5-.2-3.8ZM8.7 12.6V7.4L12.8 10 8.7 12.6Z"/></svg>`,
  facebook: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M11.6 17V10.7h2.1l.3-2.5h-2.4V6.6c0-.7.2-1.2 1.3-1.2h1.3V3.1c-.2 0-1-.1-2-1.1-1.1 0-1.8.6-1.8 1.8v1.4H8.2v2.5h2.1V17h1.3Z"/></svg>`,
  twitter: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M14.7 3.5h2.2L12.6 9l5.2 7.5h-4.1L10.4 12 6.3 16.5H4.1l4.6-5.8L3.8 3.5h4.2l3 4.2 3.7-4.2Zm-.8 11.6h1.2L6.2 4.8H4.9l8.9 10.3Z"/></svg>`,
  instagram: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3.4" y="3.4" width="13.2" height="13.2" rx="3.4" stroke="currentColor" stroke-width="1.3"/><circle cx="10" cy="10" r="3.1" stroke="currentColor" stroke-width="1.3"/><circle cx="14.2" cy="5.8" r="0.8" fill="currentColor"/></svg>`,
  linkedin: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.7 7.4H3.4V16h2.3V7.4ZM4.55 3.8a1.35 1.35 0 1 0 0 2.7 1.35 1.35 0 0 0 0-2.7ZM16.6 16h-2.3v-4.1c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3.9-.1.2-.1.5-.1.8V16H9.3s.1-7.1 0-7.8h2.3v1.1c.3-.5 1-1.2 2.4-1.2 1.8 0 3.1 1.2 3.1 3.7V16Z"/></svg>`
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
          <a class="btn btn-primary btn-sm" href="#">Get started free</a>
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
