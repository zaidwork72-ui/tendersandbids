// components.js

const pagePath = window.location.pathname;

// Compute a stable root path relative to the current page so asset
// URLs resolve correctly from any nested folder.
const segments = pagePath.split('/').filter(Boolean);
let rootPath = './';
if (segments.length > 1) {
  // number of directory levels above the current file (exclude the file itself)
  const ups = segments.length - 1;
  rootPath = Array(ups).fill('..').join('/') + '/';
}

const icons = {
  chevron: '<span class="material-symbols-rounded" aria-hidden="true">expand_more</span>',
  search: '<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.333 7.333a5 5 0 1 0-10 0 5 5 0 0 0 10 0Zm.667 0a5.667 5.667 0 1 1-11.333 0 5.667 5.667 0 0 1 11.333 0Z" fill="#9BA2BB"/><path d="M10.898 10.898c.13-.13.34-.13.471 0l2.867 2.866a.333.333 0 0 1-.472.472l-2.866-2.867a.333.333 0 0 1 0-.471Z" fill="#9BA2BB"/></svg>',
  arrow: '<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>',
  check: '<span class="material-symbols-rounded icon-check" aria-hidden="true">check</span>',
  verified: '<svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.006 11.495a3.5 3.5 0 0 0-1.614-2.948.5.5 0 0 1-.22-.531 3.501 3.501 0 0 0-4.182-4.183.5.5 0 0 1-.53-.219A3.503 3.503 0 0 0 9.83 2.43c-.515.282-.951.69-1.268 1.184a.501.501 0 0 1-.53.219 3.501 3.501 0 0 0-4.183 4.174.5.5 0 0 1-.221.531 3.502 3.502 0 0 0-1.194 4.646 3.5 3.5 0 0 0 1.194 1.27.5.5 0 0 1 .22.53 3.5 3.5 0 0 0 4.183 4.173.5.5 0 0 1 .531.22 3.5 3.5 0 0 0 5.907 0l.047-.063a.5.5 0 0 1 .483-.157 3.5 3.5 0 0 0 4.174-4.182.5.5 0 0 1 .219-.53 3.503 3.503 0 0 0 1.614-2.95Zm1 0a4.5 4.5 0 0 1-1.797 3.596 4.5 4.5 0 0 1-1.266 3.828 4.5 4.5 0 0 1-3.825 1.273 4.498 4.498 0 0 1-5.767 1.25 4.5 4.5 0 0 1-1.437-1.249 4.501 4.501 0 0 1-3.827-1.265 4.5 4.5 0 0 1-1.274-3.826A4.498 4.498 0 0 1 1 11.495a4.5 4.5 0 0 1 1.813-3.608 4.5 4.5 0 0 1 3.2-4.961 4.501 4.501 0 0 1 1.901-.13 4.5 4.5 0 0 1 7.192 0 4.499 4.499 0 0 1 5.103 5.103 4.498 4.498 0 0 1 1.797 3.596Z" fill="#2B62F5"/><path d="M14.04 9.244a.48.48 0 0 1 .678.677l-3.835 3.833a.48.48 0 0 1-.677 0l-1.918-1.916a.479.479 0 1 1 .678-.678l1.578 1.578 3.496-3.494Z" fill="#2B62F5"/></svg>',
  globe: '<svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9 20.64v-4.35a2.395 2.395 0 0 1 2.396-2.395h4.352a.48.48 0 1 1 0 .958h-4.352a1.438 1.438 0 0 0-1.438 1.437v4.35a.48.48 0 0 1-.959 0ZM11.024 9.583a1.437 1.437 0 0 0-1.438-1.438A3.355 3.355 0 0 1 6.23 4.791v-1.59a.48.48 0 0 1 .958 0v1.59a2.395 2.395 0 0 0 2.397 2.396 2.397 2.397 0 0 1 2.396 2.396 1.438 1.438 0 0 0 2.876 0 2.402 2.402 0 0 1 2.396-2.396h3.039a.48.48 0 1 1 0 .958h-3.039c-.79 0-1.438.648-1.438 1.438a2.396 2.396 0 0 1-4.792 0Zm-.959 11.451v-3.785a1.437 1.437 0 0 0-1.438-1.438 2.397 2.397 0 0 1-2.396-2.396v-.958a1.437 1.437 0 0 0-1.438-1.437H1.965a.48.48 0 1 1 0-.958h2.828a2.397 2.397 0 0 1 2.397 2.395v.958a1.437 1.437 0 0 0 1.437 1.438 2.397 2.397 0 0 1 2.397 2.396v3.785a.48.48 0 0 1-.959 0Z" fill="#2B62F5"/><path d="M20.61 11.499c0-5.028-4.078-9.103-9.107-9.103-5.03 0-9.106 4.075-9.106 9.103s4.077 9.103 9.106 9.103c5.03 0 9.107-4.075 9.107-9.103Zm.958 0c0 5.557-4.506 10.062-10.065 10.062-5.559 0-10.065-4.505-10.065-10.062 0-5.557 4.506-10.062 10.065-10.062 5.559 0 10.065 4.505 10.065 10.062Z" fill="#2B62F5"/></svg>',
  unlock: '<svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.615 12.457a1.82 1.82 0 0 0-.535-1.29L14.04 5.13a.479.479 0 1 1 .678-.678l6.038 6.037.184.202a2.779 2.779 0 0 1 0 3.532l-.184.202-4.121 4.12a.48.48 0 0 1-.678-.677l4.123-4.121a1.821 1.821 0 0 0 .535-1.29Z" fill="#2B62F5"/><path d="M1.438 10.706V5.75a1.437 1.437 0 0 1 1.438-1.438h4.957c.636 0 1.246.253 1.695.702l5.469 5.467a2.803 2.803 0 0 1 0 3.953l-3.434 3.432a2.806 2.806 0 0 1-3.954 0L2.14 12.4a2.396 2.396 0 0 1-.702-1.693Zm.959 0c0 .38.151.746.42 1.016l5.468 5.465.134.121a1.847 1.847 0 0 0 2.468-.121l3.43-3.43a1.845 1.845 0 0 0 0-2.6L8.85 5.692a1.438 1.438 0 0 0-1.016-.42H2.875a.48.48 0 0 0-.48.479v4.956Z" fill="#2B62F5"/><path d="M5.272 9.103a.958.958 0 1 1 1.917 0 .958.958 0 0 1-1.917 0Z" fill="#2B62F5"/></svg>',
  layers: '<svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.544 16.77a.48.48 0 1 1 0 .958H2.876a.48.48 0 1 1 0-.959h7.668Zm9.247-1.777a.48.48 0 0 1 .678.678l-3.834 3.833a.48.48 0 0 1-.678 0l-1.917-1.917a.479.479 0 1 1 .678-.677l1.578 1.578 3.495-3.495Zm-4.454-3.973a.48.48 0 1 1 0 .958H2.876a.48.48 0 1 1 0-.958h12.461Zm0-5.75a.48.48 0 1 1 0 .959H2.876a.48.48 0 1 1 0-.959h12.461Z" fill="#2B62F5"/></svg>',
  action:'<svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.916 5.41a.48.48 0 0 1 .677.678L7.05 16.63a.48.48 0 0 1-.678 0l-4.793-4.791a.479.479 0 1 1 .678-.678l4.454 4.453L16.916 5.41Zm3.834 3.834a.48.48 0 0 1 .678.677l-7.19 7.187a.48.48 0 0 1-.677 0l-1.438-1.437a.479.479 0 1 1 .678-.678l1.098 1.099 6.851-6.848Z" fill="#2B62F5"/></svg>',
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
`,
save: '<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.667 12.667V3.333a1.666 1.666 0 0 1 1.666-1.666h6.805l.164.01c.378.043.731.214 1 .487l2.531 2.531.111.12c.245.293.384.662.39 1.047v6.805a1.667 1.667 0 0 1-1.668 1.666H3.333a1.667 1.667 0 0 1-1.667-1.666Zm.666 0a1 1 0 0 0 1 1h9.334a1 1 0 0 0 1-1V5.87a1 1 0 0 0-.3-.7l-2.538-2.538a1 1 0 0 0-.603-.293l-.097-.007H3.333a1 1 0 0 0-1 1v9.334Z" fill="#9BA2BB"/><path d="M11 14V9.333A.333.333 0 0 0 10.667 9H5.334A.333.333 0 0 0 5 9.333V14a.333.333 0 0 1-.667 0V9.333a1 1 0 0 1 1-1h5.334a1 1 0 0 1 1 1V14A.333.333 0 1 1 11 14Z" fill="#9BA2BB"/><path d="M4.333 4.667V2A.333.333 0 1 1 5 2v2.667A.333.333 0 0 0 5.333 5H10a.333.333 0 0 1 0 .667H5.333a1 1 0 0 1-1-1Z" fill="#000"/></svg>',
recieve: '<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.333 13.333V2.667A1.667 1.667 0 0 1 4 1h6c.088 0 .173.035.236.098l3.333 3.333a.333.333 0 0 1 .098.236v8.666A1.666 1.666 0 0 1 12 15H4a1.666 1.666 0 0 1-1.667-1.667Zm.667 0a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.805L9.862 1.667H4a1 1 0 0 0-1 1v10.666Z" fill="#9BA2BB"/><path d="M9 4V1.333a.333.333 0 0 1 .667 0V4a1 1 0 0 0 1 1h2.666a.333.333 0 1 1 0 .667h-2.666A1.666 1.666 0 0 1 9 4ZM6.667 5.667a.333.333 0 0 1 0 .666H5.333a.333.333 0 1 1 0-.666h1.334Zm4 2.666a.333.333 0 0 1 0 .667H5.333a.333.333 0 0 1 0-.667h5.334Zm0 2.667a.333.333 0 1 1 0 .667H5.333a.333.333 0 0 1 0-.667h5.334Z" fill="#9BA2BB"/></svg>',
eye: '<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3a7.5 7.5 0 0 1 6.822 4.386l.111.255.005.011a1 1 0 0 1 0 .696l-.005.011a7.5 7.5 0 0 1-13.866 0l-.005-.01a1 1 0 0 1 0-.697l.005-.011A7.5 7.5 0 0 1 8 3.001Zm0 .667a6.834 6.834 0 0 0-6.313 4.217.334.334 0 0 0 0 .23 6.834 6.834 0 0 0 12.626 0 .333.333 0 0 0 0-.23h-.001A6.835 6.835 0 0 0 8 3.667Z" fill="#9BA2BB"/><path d="M9.666 8a1.667 1.667 0 1 0-3.333 0 1.667 1.667 0 0 0 3.333 0Zm.667 0a2.333 2.333 0 1 1-4.667 0 2.333 2.333 0 0 1 4.667 0Z" fill="#9BA2BB"/></svg>',
action0: '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.705 4.705a.417.417 0 1 1 .59.59L6.128 14.46a.417.417 0 0 1-.59 0l-4.166-4.166a.417.417 0 1 1 .59-.59l3.871 3.873 8.872-8.873Zm3.334 3.334a.417.417 0 1 1 .589.589l-6.25 6.25a.417.417 0 0 1-.59 0l-1.25-1.25a.417.417 0 0 1 .59-.59l.955.956L18.04 8.04Z" fill="#9BA2BB"/></svg>',
trending: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m22 7-8.5 8.5-5-5L2 17" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7h6v6" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/></svg>',
fileSearch: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2v4a2 2 0 0 0 2 2h4" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3m5 11-1.5-1.5" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/></svg>',
lockKey: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 10H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM7 10V7a5 5 0 1 1 10 0v3" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/></svg>',
multiple: '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m12 15 2 2 4-4" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 8H10a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" stroke="#9BA2BB" stroke-linecap="round" stroke-linejoin="round"/></svg>',
blueX: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6 6 18M6 6l12 12" stroke="#3B72F6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
greyX: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6 6 18M6 6l12 12" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
favourite:'<svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6.995 1.499 1.65 3.348 3.697.54-2.678 2.608.63 3.687-3.299-1.938-3.297 1.739.63-3.688-2.68-2.409 3.698-.54L6.996 1.5Z" stroke="#50566F" stroke-width="1.199" stroke-linejoin="round"/></svg>',
viewArrow: '<svg width="9" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m4.952 7.636-.657-.647 2.702-2.702H0v-.938h6.997L4.295.656 4.952 0 8.77 3.818 4.952 7.636Z" fill="#8D95B0"/></svg>',
germany:'<span class="fi fi-de"></span>',
uae: '<span class="fi fi-ae"></span>',
uk:'<span class="fi fi-gb"></span>',
saudi: '<span class="fi fi-sa"></span>',
australia: '<span class="fi fi-au"></span>',
canada: '<span class="fi fi-ca"></span>',
sa: '<span class="fi fi-za"></span>',
netherlands: '<span class="fi fi-nl"></span>',
singapore: '<span class="fi fi-sg"></span>',
brazil: '<span class="fi fi-br"></span>'
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
        <a class="brand" href="${rootPath}index.html" aria-label="Tenders & Bids">
          <img src="${rootPath}assets/logos/logo.svg" alt="" width="130" height="23">
        </a>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div class="navbar__right">
          <ul class="nav-list">${links}</ul>
          <a class="btn btn-primary btn-sm" href="${rootPath}pages/auth/login.html">Login</a>
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
          <a class="brand" href="${rootPath}index.html" aria-label="Tenders & Bids">
            <img src="${rootPath}assets/logos/logo.svg" alt="" width="130" height="23">
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
        <p class="footer-secure">Payment secured by: <img src="${rootPath}assets/images/stripe.png" alt="stripe" width="50" height="21"></p>
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